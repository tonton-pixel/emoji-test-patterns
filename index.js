//
const fs = require ('fs');
const path = require ('path');
//
const regexgen = require ('regexgen');
//
// https://www.unicode.org/reports/tr51/
//
// Copy of https://unicode.org/Public/emoji/11.0/emoji-test.txt
//
function getEmojiTestPatterns ()
{
    let result = { };
    let emojiList = { };
    let lines = fs.readFileSync (path.join (__dirname, 'data', 'emoji-test.txt'), { encoding: 'utf8' }).split ('\n');
    for (let line of lines)
    {
        if ((line) && (line[0] !== '#'))
        {
            let hashOffset = line.indexOf ('#');
            let data = line.substring (0, hashOffset);
            let fields = data.split (';');
            let codePoints = fields[0].trim ().split (' ');
            let status = fields[1].trim ();
            let emojiString = "";
            for (let codePoint of codePoints)
            {
                emojiString += String.fromCodePoint (parseInt (codePoint, 16));
            }
            emojiList[emojiString] = (status === "fully-qualified");
        }
    }
    //
    let emojiKeys = Object.keys (emojiList).sort ((a, b) => [...b].length - [...a].length); // Decreasing length (critical!)
    //
    let trieAll = new regexgen.Trie;
    for (let key of emojiKeys)
    {
        trieAll.add (key);
    }
    result["Emoji_Test_All"] = '(?:' + trieAll.toString ('u') + ')';
    //
    let trieKeyboard = new regexgen.Trie;
    for (let key of emojiKeys)
    {
        if (emojiList[key])
        {
            trieKeyboard.add (key);
        }
    }
    result["Emoji_Test_Keyboard"] = '(?:' + trieKeyboard.toString ('u') + ')';
    //
    return result;
}
//
module.exports = getEmojiTestPatterns ();
//
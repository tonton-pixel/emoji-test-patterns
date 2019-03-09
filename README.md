# Emoji Test Patterns

## Description

This Node module returns a JSON-compatible object literal containing two pattern strings: all emoji and fully-qualified (keyboard) emoji, generated using the information extracted from the Unicode 12.0 data file `emoji-test.txt`:

- **Emoji_Test_All**
- **Emoji_Test_Component**
- **Emoji_Test_Keyboard**
- **Emoji_Test_Display**

### Notes

- Providing patterns as strings instead of regular expressions does require the extra step of using `new RegExp ()` to actually make use of them, but it has two main advantages:

    - Flags can be set differently depending on how the patterns are used. In any case, though, the regular expressions *must* include a 'u' flag, since the patterns make use of the new type of Unicode escape sequences: `\u{1F4A9}`.

    - The patterns can be further modified before being turned into regular expressions; for instance, the pattern can be embedded into a larger one. See examples below.

## Installing

Switch to your *project* directory (`cd`) then run:

```bash
npm install emoji-test-patterns
```

## Testing

A basic test can be performed by running the following command line from the *package* directory:

```bash
npm test
```

## Examples

### Testing whether an emoji is fully-qualified (keyboard) or non-fully-qualified (display)

```javascript
const emojiPatterns = require ('emoji-test-patterns');
const emojiKeyboardRegex = new RegExp ('^' + emojiPatterns["Emoji_Test_Keyboard"] + '$', 'u');
console.log (emojiKeyboardRegex.test ("❤️"));
// -> true
console.log (emojiKeyboardRegex.test ("❤"));
// -> false
```

### Extracting all emoji from a string

```javascript
const emojiPatterns = require ('emoji-test-patterns');
const emojiAllRegex = new RegExp (emojiPatterns["Emoji_Test_All"], 'gu');
console.log (JSON.stringify ("AaĀā#*0❤🇦愛爱❤️애💜 🇨🇦🇫🇷🇬🇧🇯🇵🇺🇸 👪⬌👨‍👩‍👦 💑⬌👩‍❤️‍👨 💏⬌👩‍❤️‍💋‍👨".match (emojiAllRegex)));
// -> ["❤","❤️","💜","🇨🇦","🇫🇷","🇬🇧","🇯🇵","🇺🇸","👪","👨‍👩‍👦","💑","👩‍❤️‍👨","💏","👩‍❤️‍💋‍👨"]
```

### Extracting all fully-qualified (keyboard) emoji from a string

```javascript
const emojiPatterns = require ('emoji-test-patterns');
const emojiAllRegex = new RegExp (emojiPatterns["Emoji_Test_All"], 'gu');
const emojiKeyboardRegex = new RegExp ('^' + emojiPatterns["Emoji_Test_Keyboard"] + '$', 'u');
let emojiList = "AaĀā#*0❤🇦愛爱❤️애💜 🇨🇦🇫🇷🇬🇧🇯🇵🇺🇸 👪⬌👨‍👩‍👦 💑⬌👩‍❤️‍👨 💏⬌👩‍❤️‍💋‍👨".match (emojiAllRegex);
if (emojiList)
{
    emojiList = emojiList.filter (emoji => emojiKeyboardRegex.test (emoji));
}
console.log (JSON.stringify (emojiList));
// -> ["❤️","💜","🇨🇦","🇫🇷","🇬🇧","🇯🇵","🇺🇸","👪","👨‍👩‍👦","💑","👩‍❤️‍👨","💏","👩‍❤️‍💋‍👨"]
```

### Removing all emoji from a string

```javascript
const emojiPatterns = require ('emoji-test-patterns');
const emojiAllRegex = new RegExp (emojiPatterns["Emoji_Test_All"], 'gu');
console.log (JSON.stringify ("AaĀā#*0❤🇦愛爱❤️애💜 🇨🇦🇫🇷🇬🇧🇯🇵🇺🇸 👪⬌👨‍👩‍👦 💑⬌👩‍❤️‍👨 💏⬌👩‍❤️‍💋‍👨".replace (emojiAllRegex, "")));
// -> "AaĀā#*0🇦愛爱애  ⬌ ⬌ ⬌"
```

## License

The MIT License (MIT).

Copyright © 2018-2019 Michel MARIANI.

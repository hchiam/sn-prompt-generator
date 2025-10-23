# Sermon Note Prompt Generator

![version](https://img.shields.io/github/release/hchiam/sn-prompt-generator) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![HitCount](http://hits.dwyl.com/hchiam/sn-prompt-generator.svg)](http://hits.dwyl.com/hchiam/sn-prompt-generator)

<https://sn-prompt-generator.surge.sh>

Or if surge.sh is down again: <https://sn-prompt-generator.vercel.app>

Fun fact: Works offline! :)

You may also like: <https://github.com/hchiam/bible-verse-listener>

To test out the GitHub repo, locally on your own computer:

```bash
git clone https://github.com/hchiam/sn-prompt-generator.git
cd sn-prompt-generator
bash copy-to-public-folder.sh
open public/index.html
```

The `index.html` file inside the `public` folder is the one that gets served "publicly" (i.e. on surge.sh).

(If publishing to surge.sh, remember to _**update the service worker**_.)

`bash copy-to-public-folder.sh; surge public https://sn-prompt-generator.surge.sh`

## For testing

`bash copy-to-public-folder.sh; surge public https://sn-prompt-generator-test.surge.sh`

## For backup vercel site

`bash copy-to-public-folder.sh; cd public; vercel`

```sh
cd public;
vercel --prod;
```

## Version Notes Highlights

- [1.0.0](https://github.com/hchiam/sn-prompt-generator/tree/3cf92d7e4c7dedd926cf7496e7ae8c14e0a9b2e8): Included many ["pure fun" prompts from kids](https://github.com/hchiam/sn-prompt-generator/blob/3cf92d7e4c7dedd926cf7496e7ae8c14e0a9b2e8/script.js#L150) that we kept _just for the start_ (there was a longer-term plan in mind since the beginning).
- [2.0.0](https://github.com/hchiam/sn-prompt-generator/releases/tag/2.0.0): Updated prompts to sustain active thinking for the whole sermon. Moved "main point" section to the bottom and replaced it with a "free space" for more flexibility. Tweaked printout sheet for subtle change cues. Also works offline!
- [3.0.0](https://github.com/hchiam/sn-prompt-generator/releases/tag/3.0.0): Load website faster by using surge.sh instead of glitch.me
- [3.1.0](https://github.com/hchiam/sn-prompt-generator/releases/tag/3.1.0) and [3.1.1](https://github.com/hchiam/sn-prompt-generator/releases/tag/3.1.1): [CSP](https://github.com/hchiam/learning-csp) + [WAI-ARIA](https://www.scottohara.me/blog/2018/05/05/hidden-vs-none.html) + code formatting with [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
- For other release notes: <https://github.com/hchiam/sn-prompt-generator/releases>

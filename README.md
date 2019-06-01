## YouTube Key Master Browser Extension

[licence-card]: https://img.shields.io/badge/License-MIT-blue.svg
[licence-link]: http://opensource.org/licenses/MIT "MIT License"

YouTube playback control shortcut overrides and fix for the play/pause button spacebar auto-pausing bug. No matter what video control is focused:

* Vertical arrows always control volume
* Horizontal arrows always control seeking
* Spacebar and enter always toggle the paused state

### Upcoming enhancements

* [ ] Options page to allow toggling of each shortcut override
* [ ] Useful popup page with more information and actions
* [ ] Additional options:
  * Home restarts the video
  * End finishes the video
  * Page up sets the video volume to 100%
  * Page down sets the video volume to 0%

### Development
* Main logic is inside `src/app/main.js`
* Install [Yarn](https://yarnpkg.com) in scope global
  * `npm install -g yarn`
* Install dependencies
  * `yarn`
* Start project - Watch files in project and rebuild if any file changed
  * `yarn start`
* Build for production
  * `yarn build`

### Debugging in Firefox

1. Visit `about:debugging#addons` in Firefox
2. Click on **Load Temporary Add-on**
3. Select the folder `extension` or the folder name you changed in the project root directory

Powered by [Cross-browser Extension Boilerplate](https://github.com/williankeller/browser-extension-boilerplate).
A boilerplate template for building cross browser extensions (Chrome and Firefox).

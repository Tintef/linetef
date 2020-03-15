global.browser = require('webextension-polyfill');

import messages from './data/messages';

chrome.runtime.onMessage.addListener(({ message }, sender, sendResponse) => {
  if (messages.includes(message)) {
    chrome.tabs.query({}, tabs => {
      tabs.forEach(({ id }) => {
        chrome.tabs.sendMessage(id, { message });
      });
    });
  }
});

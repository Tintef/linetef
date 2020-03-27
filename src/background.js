import messages from './data/messages';

global.browser = require('webextension-polyfill');

chrome.runtime.onMessage.addListener(({ message }) => {
  if (messages.includes(message)) {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(({ id }) => {
        chrome.tabs.sendMessage(id, { message });
      });
    });
  }
});

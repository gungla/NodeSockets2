import { leerMessages } from './app.js';

const productos = []; 
const dbIDs = [];
const lastID = { lastID: 0 };
const messages = [];

function checkMessagesOld() {
  let messageOld = JSON.parse(leerMessages());
  if (messageOld !== -1) {
    messages.push.apply(messages, messageOld);
  }
}

checkMessagesOld();
export { productos, dbIDs, lastID, messages };

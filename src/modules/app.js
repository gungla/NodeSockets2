const fs = require('fs');
import path from 'path';
const publicPathFolder = path.resolve(__dirname, './../../public/');
const publicPathFileName = path.resolve(
  __dirname,
  './../../public/messages.txt'
);

const random = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const contenido = () => {
  let obj = {
    title: `Producto ${Math.floor(random(1, 10))}`,
    price: `${random(0.0, 9999.99).toFixed(2)}`,
    thumbnail: `https://picsum.photos/id/${Math.floor(random(1, 200))}/200/200`,
    id: ``,
  };
  return obj;
};

const objToJSON = (contenido) => {
  return JSON.stringify(contenido, undefined, 2);
};

function leerMessages() {
  let filenames = fs.readdirSync(publicPathFolder);
  const found = filenames.find((element) => 'messages.txt' === element);
  if (found === 'messages.txt') {
    const data = fs.readFileSync(publicPathFileName, 'utf-8');
    return data;
  } else {
    return -1;
  }
}

function guardarMessages(messages) {
  fs.writeFileSync(publicPathFileName, objToJSON(messages), 'utf-8');
}

export { contenido, objToJSON, leerMessages, guardarMessages };

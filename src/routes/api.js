import express from 'express';
import Producto from './../class/producto.js';
import { contenido } from '../modules/app.js';
import { productos, dbIDs, lastID } from '../modules/data.js';

const router = express.Router();

for (let id = 1; id <= 3; id++) {
  const objDatos = contenido();
  const objProducto = new Producto(
    objDatos.title,
    objDatos.price,
    objDatos.thumbnail,
    id
  );
  productos.push(objProducto);
  dbIDs.push(id);
  lastID.lastID = id;
}

router.get('/productos/listar', (req, res) => {
  if (productos.length < 1) {
    return res.status(400).json({
      error: 'No hay productos cargados',
    });
  }
  res.json({
    productos,
  });
});

router.get('/productos/listar/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    return res.status(400).json({
      error: 'ERROR, producto no encontrado',
    });
  }

  const indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    return res.status(400).json({
      error: 'ERROR, producto no encontrado',
    });
  }

  const product = productos[indexID];
  res.json({
    product,
  });
});

router.post('/guardar', (req, res) => {
  const body = req.body;
  const msgErrorParametros = 'ERRPR, parámetros no validos';
  const errorGuardar = (msg) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (body.title === undefined) {
    errorGuardar('Title no esta definido');
  }

  if (body.price === undefined) {
    errorGuardar('Precio no esta definido');
  }

  if (isNaN(parseFloat(body.price))) {
    errorGuardar('ERROR, el precio no pude ser una letra');
  }

  if (body.thumbnail === undefined) {
    errorGuardar('No esta definida la imagen');
  }

  lastID.lastID = lastID.lastID + 1;

  const objProducto = new Producto(
    body.title,
    body.price,
    body.thumbnail,
    lastID.lastID
  );
  productos.push(objProducto);
  dbIDs.push(lastID.lastID);

  if (body.form === 'true') {
    res.redirect(301, '/');
  } else {
    res.json({
      objProducto,
    });
  }
});

router.put('/productos/actualizar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const msgErrorID = 'ERROR, producto no encontrado';
  const msgErrorParametros = 'ERROR,  los parámetros no son validos';
  let flagUpdate = true;

  const errorGuardar = (msg) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    flagUpdate = false;
    errorGuardar(msgErrorID);
  }

  const indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    flagUpdate = false;
    errorGuardar(msgErrorID);
  }

  if (body.title === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (body.price === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (isNaN(parseFloat(body.price))) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (body.thumbnail === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (flagUpdate) {
    productos[indexID].title = body.title;
    productos[indexID].price = body.price;
    productos[indexID].thumbnail = body.thumbnail;
    const objProducto = productos[indexID];

    res.json({
      objProducto,
    });
  }
});

router.delete('/productos/borrar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const msgErrorID = 'ERROR, producto no encontrado';
  let flagDelete = true;

  const errorGuardar = (msg) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    flagDelete = false;
    errorGuardar(msgErrorID);
  }

  let indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    flagDelete = false;
    errorGuardar(msgErrorID);
  }

  if (flagDelete) {
    const product = productos[indexID];
    productos.splice(indexID, 1);
    dbIDs.splice(indexID, 1);

    res.json({
      product,
    });
  }
});

export default router;

// Importamos las librerías necesarias
const express = require('express');
const jimp = require('jimp');
const fs = require('fs');
const path = require('path');

// Creamos una instancia de la aplicación Express
const app = express();

// Establecemos el puerto en el que escuchará la aplicación
const port = 8225;

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// Ruta para la marca de agua en la ruta "/b"
app.post('/b', async (req, res) => {
  // Comprobamos si se ha proporcionado un enlace
  if (!req.body.url) {
    return res.status(400).send('No se ha proporcionado un enlace');
  }

  // Descargamos la imagen del enlace
  const image = await jimp.read(req.body.url);

  // Escalamos la imagen a una resolución de 1279px por 720px
  image.scaleToFit(1279, 720);

  // Cargamos la marca de agua
  const watermark = await jimp.read(path.join(__dirname, 'wm-backdrop_v3.png'));

  // Escalamos la marca de agua a una resolución de 1279px por 720px
  watermark.scaleToFit(1279, 720);

  // Colocamos la marca de agua en la imagen
  image.composite(watermark, 0, 0, {
    opacity: 1,
  });

  // Guardamos la imagen de salida en formato JPEG con una calidad del 95%
  image.writeAsync(path.join(__dirname, 'WM-AstroPeliculasOf.jpg'), {
    quality: 95,
  });

  // Enviamos la imagen al navegador
  res.sendFile(path.join(__dirname, 'WM-AstroPeliculasOf.jpg'));
});

// Ruta para la marca de agua en la ruta "/p"
app.post('/p', async (req, res) => {
  // Comprobamos si se ha proporcionado un enlace
  if (!req.body.url) {
    return res.status(400).send('No se ha proporcionado un enlace');
  }

  // Descargamos la imagen del enlace
  const image = await jimp.read(req.body.url);

  // Escalamos la imagen a una resolución de 720px por 1080px
  image.scaleToFit(720, 1080);

  // Cargamos la marca de agua
  const watermark = await jimp.read(path.join(__dirname, 'wm-poster_v2.png'));

  // Escalamos la marca de agua a una resolución de 720px por 1080px
  watermark.scaleToFit(720, 1080);

  // Colocamos la marca de agua en la imagen
  image.composite(watermark, 0, 0, {
    opacity: 0.25,
  });

  // Guardamos la imagen de salida en formato JPEG con una calidad del 95%
  image.writeAsync(path.join(__dirname, 'WM-AstroPeliculasOf.jpg'), {
    quality: 95,
  });

  // Enviamos la imagen al navegador
  res.sendFile(path.join(__dirname, 'WM-AstroPeliculasOf.jpg'));
});

// Iniciamos la aplicación
app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
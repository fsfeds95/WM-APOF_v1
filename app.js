// Se importan las librerías necesarias.
const express = require('express');
const jimp = require('jimp');
const fs = require('fs');

// Se crea una instancia de la aplicación Express.
const app = express();

// Se configura el puerto de escucha de la aplicación.
const port = 8225;

// Se configura la aplicación para que escuche en el puerto especificado.
app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});

// Se crea una ruta para la ruta "/poster".
app.get('/p', async (req, res) => {
  // Se obtiene el enlace de la imagen de la solicitud.
  const url = req.query.url;

  // Se comprueba si se ha suministrado un enlace.
  if (!url) {
    return res.status(400).send('No se ha suministrado un enlace.');
  }

  // Se descarga la imagen del enlace.
  const image = await jimp.read(url);

  // Se reescala la imagen a una resolución de 720px por 1280px.
  image.resize(720, 1080);

  // Se carga la imagen de la marca de agua.
  const watermark = await jimp.read('wm-poster_v1.png');

  // Se reescala la marca de agua a un tamaño de 720px por 1280px.
  watermark.resize(720, 1080);

  // Se establece la opacidad de la marca de agua.
  watermark.opacity(0.25);

  // Se combina la imagen con la marca de agua.
  image.composite(watermark, 0, 0);

  // Se guarda la imagen de salida en formato JPEG con una calidad de imagen del 90%.
  image.write('WM-AstroPeliculasOf.jpg', (err) => {
    if (err) {
      return res.status(500).send('Error al guardar la imagen.');
    }
  });

  // Se envía la imagen de salida al navegador.
  res.sendFile('WM-AstroPeliculasOf.jpg', { root: __dirname });
});

// Se crea una ruta para la ruta "/backdrop".
app.get('/b', async (req, res) => {
  // Se obtiene el enlace de la imagen de la solicitud.
  const url = req.query.url;

  // Se comprueba si se ha suministrado un enlace.
  if (!url) {
    return res.status(400).send('No se ha suministrado un enlace.');
  }

  // Se descarga la imagen del enlace.
  const image = await jimp.read(url);

  // Se reescala la imagen a una resolución de 1279px por 720px.
  image.resize(1279, 720);

  // Se carga la imagen de la marca de agua.
  const watermark = await jimp.read('wm-backdrop_v2.png');

  // Se reescala la marca de agua a un tamaño de 1279px por 720px.
  watermark.resize(1279, 720);

  // Se establece la opacidad de la marca de agua.
  watermark.opacity(0.25);

  // Se combina la imagen con la marca de agua.
  image.composite(watermark, 0, 0);

  // Se guarda la imagen de salida en formato JPEG con una calidad de imagen del 90%.
  image.write('WM-AstroPeliculasOf.jpg', (err) => {
    if (err) {
      return res.status(500).send('Error al guardar la imagen.');
    }
  });

  // Se envía la imagen de salida al navegador.
  res.sendFile('WM-AstroPeliculasOf.jpg', { root: __dirname });
});

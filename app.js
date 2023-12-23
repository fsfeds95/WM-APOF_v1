// Importar las bibliotecas necesarias
const express = require('express');
const Jimp = require('jimp');
const path = require('path');

// Crear una instancia de Express
const app = express();

// Escuchar las rutas "/p" y "/b" en Express
app.get('/p', async (req, res) => {
  // Obtener la URL de la imagen del query
  const url = req.query.url;

  // Verificar si se proporcionó una URL
  if (!url) {
    return res.send('¡Advertencia! Debes proporcionar una URL de imagen.');
  }

  try {
    // Cargar la imagen y la marca de agua con Jimp
    const image = await Jimp.read(url);
    const watermark = await Jimp.read(path.join(__dirname, 'wm-poster_v2.png'));

    // Escalar la imagen a un tamaño de 720x1080 y añadir la marca de agua con una opacidad de 0.25
    image.resize(720, 1080).composite(watermark, 0, 0, {
      mode: Jimp.BLEND_MULTIPLY,
      opacitySource: 0.25,
    });

    // Convertir la imagen con marca de agua a base64
    const base64Image = await image.getBase64Async(Jimp.MIME_JPEG);

    // Mostrar la imagen en el navegador
    res.send(`<img src="data:${Jimp.MIME_JPEG};base64,${base64Image}" alt="Imagen con marca de agua">`);
  } catch (error) {
    console.error(error);
    res.status(500).send('¡Ha ocurrido un error al procesar la imagen!');
  }
});

app.get('/b', async (req, res) => {
  // Obtener la URL de la imagen del query
  const url = req.query.url;

  // Verificar si se proporcionó una URL
  if (!url) {
    return res.send('¡Advertencia! Debes proporcionar una URL de imagen.');
  }

  try {
    // Cargar la imagen y la marca de agua con Jimp
    const image = await Jimp.read(url);
    const watermark = await Jimp.read(path.join(__dirname, 'wm-backdrop_v3.png'));

    // Escalar la imagen a un tamaño de 1280x720 y añadir la marca de agua con una opacidad de 1
    image.resize(1280, 720).composite(watermark, 0, 0, {
      mode: Jimp.BLEND_MULTIPLY,
      opacitySource: 1,
    });

    // Convertir la imagen con marca de agua a base64
    const base64Image = await image.getBase64Async(Jimp.MIME_JPEG);

    // Mostrar la imagen en el navegador
    res.send(`<img src="data:${Jimp.MIME_JPEG};base64,${base64Image}" alt="Imagen con marca de agua">`);
  } catch (error) {
    console.error(error);
    res.status(500).send('¡Ha ocurrido un error al procesar la imagen!');
  }
});

// Escuchar en el puerto 8225
app.listen(8225, () => {
  console.log('La aplicación está escuchando en http://localhost:8225');
});
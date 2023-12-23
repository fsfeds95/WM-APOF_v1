// Importar las bibliotecas
const express = require('express');
const path = require('path');
const jimp = require('jimp');
const { renameSync } = require('vfile-rename');

const app = express();
const PORT = 8225;

// Ruta para /p
app.get('/p', async (req, res) => {
  const imageUrl = req.query.url;

  // Verificar si se suministró un enlace
  if (!imageUrl) {
    return res.status(400).send('Debes proporcionar un enlace de imagen');
  }

  try {
    // Escalar la imagen a 720px x 1080px
    const image = await jimp.read(imageUrl);
    image.resize(720, 1080);

    // Agregar marca de agua con opacidad 0.25
    const watermark = await jimp.read('wm-poster_v2.png');
    image.composite(watermark, 0, 0, { mode: jimp.BLEND_SOURCE_OVER, opacityDest: 0.25 });

    // Guardar la imagen con marca de agua
    const outputFileName = 'poster_WM_AstroPeliculasOf.jpg';
    await image.quality(95).writeAsync(outputFileName);

    // Renombrar el archivo usando vfile-rename
    renameSync(outputFileName, { basename: 'WM-AstroPeliculasOf', extname: '.jpg' });

    // Enviar la imagen al navegador
    res.sendFile(path.resolve(outputFileName));
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    res.status(500).send('Error al procesar la imagen');
  }
});

// Ruta para /b
app.get('/b', async (req, res) => {
  const imageUrl = req.query.url;

  // Verificar si se suministró un enlace
  if (!imageUrl) {
    return res.status(400).send('Debes proporcionar un enlace de imagen');
  }

  try {
    // Escalar la imagen a 1280px x 720px
    const image = await jimp.read(imageUrl);
    image.resize(1280, 720);

    // Agregar marca de agua con opacidad 1
    const watermark = await jimp.read('wm-backdrop_v3.png');
    image.composite(watermark, 0, 0, { mode: jimp.BLEND_SOURCE_OVER, opacityDest: 1 });

    // Guardar la imagen con marca de agua
    const outputFileName = 'backdrop_WM_AstroPeliculasOf.jpg';
    await image.quality(95).writeAsync(outputFileName);

    // Renombrar el archivo usando vfile-rename
    renameSync(outputFileName, { basename: 'WM-AstroPeliculasOf', extname: '.jpg' });

    // Enviar la imagen al navegador
    res.sendFile(path.resolve(outputFileName));
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    res.status(500).send('Error al procesar la imagen');
  }
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});
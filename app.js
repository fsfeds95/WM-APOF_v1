const express = require('express');
const Jimp = require('jimp');

const app = express();
const port = 8225;

// Ruta "/b" para reescalar la imagen y agregar marca de agua
app.get('/b', async (req, res) => {
  // Verificar si se proporcionó un enlace
  if (!req.query.url) {
    res.send('¡Se requiere un enlace de imagen!');
    return;
  }

  try {
    const image = await Jimp.read(req.query.url);
    
    // Reescalar la imagen a 1279x720
    image.resize(1279, 720);

    // Agregar marca de agua con opacidad 1
    const watermark = await Jimp.read('wm-backdrop_v3.png');
    image.composite(watermark, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER, opacityDest: 1 });

    // Guardar la imagen en formato JPEG con calidad 95%
    const outputPath = 'WM-AstroPeliculasOf.jpg';
    await image.quality(95).writeAsync(outputPath);

    // Descargar la imagen en el navegador
    res.download(outputPath);
  } catch (error) {
    console.error(error);
    res.send('Hubo un error al procesar la imagen');
  }
});

// Ruta "/p" para reescalar la imagen, agregar marca de agua y cambiar la opacidad
app.get('/p', async (req, res) => {
  // Verificar si se proporcionó un enlace
  if (!req.query.url) {
    res.send('¡Se requiere un enlace de imagen!');
    return;
  }

  try {
    const image = await Jimp.read(req.query.url);
    
    // Reescalar la imagen a 720x1080
    image.resize(720, 1080);

    // Agregar marca de agua con opacidad 0.25
    const watermark = await Jimp.read('wm-poster_v2.png');
    image.composite(watermark, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER, opacityDest: 0.25 });

    // Guardar la imagen en formato JPEG con calidad 95%
    const outputPath = 'WM-AstroPeliculasOf.jpg';
    await image.quality(95).writeAsync(outputPath);

    // Descargar la imagen en el navegador
    res.download(outputPath);
  } catch (error) {
    console.error(error);
    res.send('Hubo un error al procesar la imagen');
  }
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
// Importamos las bibliotecas necesarias
const express = require('express');
const Jimp = require('jimp');

// Creamos la aplicación Express
const app = express();

// Configuramos el puerto
const PORT = 8225;

// Configuramos las rutas
app.get('/p', (req, res) => {
  // Verificamos si se proporcionó un enlace
  if (!req.query.url) {
    return res.send('¡Advertencia! Por favor, proporciona un enlace de imagen.');
  }
  
  // Cargamos la imagen y aplicamos el escalado y la marca de agua
  Jimp.read(req.query.url)
    .then(image => {
      // Escalado de imagen
      image.scaleToFit(720, 1080);

      // Agregamos la marca de agua con opacidad 0.25
      Jimp.read('wm-poster_v2.png')
        .then(watermark => {
          watermark.opacity(0.25);
          image.composite(watermark, 0, 0, {
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.5,
            opacityDest: 1,
          });

          // Generamos el archivo JPEG
          image.quality(95).write('WM-AstroPeliculasOf.jpg');
          res.type('jpeg').sendFile('WM-AstroPeliculasOf.jpg');
        })
        .catch(error => {
          console.log('Error al cargar la marca de agua:', error);
          res.send('¡Ocurrió un error al procesar la imagen!');
        });
    })
    .catch(error => {
      console.log('Error al cargar la imagen:', error);
      res.send('¡Ocurrió un error al cargar la imagen!');
    });
});

app.get('/b', (req, res) => {
  // Verificamos si se proporcionó un enlace
  if (!req.query.url) {
    return res.send('¡Advertencia! Por favor, proporciona un enlace de imagen.');
  }
  
  // Cargamos la imagen y aplicamos el escalado y la marca de agua
  Jimp.read(req.query.url)
    .then(image => {
      // Escalado de imagen
      image.scaleToFit(1280, 720);

      // Agregamos la marca de agua con opacidad 1
      Jimp.read('wm-backdrop_v3.png')
        .then(watermark => {
          watermark.opacity(1);
          image.composite(watermark, 0, 0, {
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.5,
            opacityDest: 1,
          });

          // Generamos el archivo JPEG
          image.quality(95).write('WM-AstroPeliculasOf.jpg');
          res.type('jpeg').sendFile('WM-AstroPeliculasOf.jpg');
        })
        .catch(error => {
          console.log('Error al cargar la marca de agua:', error);
          res.send('¡Ocurrió un error al procesar la imagen!');
        });
    })
    .catch(error => {
      console.log('Error al cargar la imagen:', error);
      res.send('¡Ocurrió un error al cargar la imagen!');
    });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`La aplicación está en funcionamiento en http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Cargar el archivo GeoJSON
const data = JSON.parse(fs.readFileSync("incendios.geojson", "utf8"));

// Ruta para obtener los datos de incendios
app.get("/api/incendios", (req, res) => {
  res.json(data);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});

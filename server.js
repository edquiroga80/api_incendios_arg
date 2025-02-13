const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Cargar el archivo GeoJSON
const dataPath = "incendios.geojson";
let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// Ruta para obtener los incendios (GET)
app.get("/api/incendios", (req, res) => {
  res.json(data);
});

// Ruta para agregar un nuevo incendio (POST)
app.post("/api/incendios", (req, res) => {
  const nuevoIncendio = req.body;

  if (!nuevoIncendio || !nuevoIncendio.geometry || !nuevoIncendio.properties) {
    return res.status(400).json({ error: "Faltan datos en el incendio" });
  }

  // Asignar un nuevo ID
  const newId = data.features.length + 1;
  nuevoIncendio.properties.id = newId;

  // Agregar el incendio a la lista
  data.features.push(nuevoIncendio);

  // Guardar en el archivo GeoJSON
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");

  res
    .status(201)
    .json({ mensaje: "Incendio agregado con éxito", incendio: nuevoIncendio });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});

import express from "express";
import { client } from "./db.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const PORT = 5000 || process.env.PORT;

// Multer setup
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to list all superheroes
app.get("/superheroes", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM superhero");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Database query error");
  }
});

// Route to find a specific superhero by ID
app.get("/superhero/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("SELECT * FROM superhero WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Superhero not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Database query error");
  }
});

// Route to create a new superhero
app.post("/create-hero", upload.array("images", 4), async (req, res) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;
  const images = req.files.map((file) => file.path);

  if (
    !images ||
    !nickname ||
    !real_name ||
    !origin_description ||
    !superpowers ||
    !catch_phrase
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required, including images." });
  }

  try {
    const result = await client.query(
      `INSERT INTO superhero (nickname, real_name, origin_description, superpowers, catch_phrase, images)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        images,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating superhero:", err);
    res.status(500).send("Error creating superhero");
  }
});

// Route to update a superhero
app.put("/superheroes/:id", upload.array("images", 4), async (req, res) => {
  const { id } = req.params;
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;
  const imagePaths = req.files.map((file) => file.path);

  try {
    const result = await client.query(
      `UPDATE superhero
       SET nickname = $1, real_name = $2, origin_description = $3, superpowers = $4, catch_phrase = $5, images = $6
       WHERE id = $7 RETURNING *`,
      [
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        imagePaths,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Superhero not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Error updating superhero");
  }
});

// Route to delete a superhero
app.delete("/superheroes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      "DELETE FROM superhero WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Superhero not found");
    }
    res.send("Superhero deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting superhero");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

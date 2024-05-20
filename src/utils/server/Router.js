import express from "express";
import { pool } from "../Database/db.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM locations");
    const locations = result.rows; // Assuming your table is named 'locations'
    client.release(); // Release the client back to the pool
    res.json(locations); // Send the retrieved data as JSON response
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

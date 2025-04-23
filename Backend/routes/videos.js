import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import util from "util";
import Video from "../models/Video.js";
import authMiddleware from "../middleware/authMiddlewere.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { console } from "inspector";
import Comment from "../models/Comment.js";

const router = express.Router();
const readdir = util.promisify(fs.readdir);

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// POST: Upload video
router.post("/upload", authMiddleware, upload.single("video"), async (req, res) => {
  try {
    const { title } = req.body;
    const video = await Video.create({
      title,
      path: req.file.filename
    });
    res.json({ message: "Video uploaded successfully!", video });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed." });
  }
});

// GET: Fetch videos from uploads folder, store in DB if new, return all
router.get("/", authMiddleware, async (req, res) => {
  try {
    const uploadFolder = path.join(__dirname, "../uploads");
    const files = await readdir(uploadFolder);

    // Get existing video paths from DB
    const dbVideos = await Video.findAll();
    const dbPaths = dbVideos.map(video => video.path);

    // Find new files
    const newFiles = files.filter(file => !dbPaths.includes(file));

    // Add new files to DB
    for (const file of newFiles) {
      await Video.create({
        title: path.parse(file).name,
        path: path.join(uploadFolder, file) // ✅ absolute path without file://
      });
    }

    // Fetch updated list from DB
    const updatedVideos = await Video.findAll();
    res.json(updatedVideos);
  } catch (error) {
    console.error("Fetch videos error:", error);
    res.status(500).json({ error: "Failed to fetch videos." });
  }
});

router.post("/:id/view", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found." });

    await video.increment("views");
    res.json({ message: "View count updated!" });
  } catch (error) {
    console.error("view error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});
// POST: Like a video
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found." });

    await video.increment("likes");
    res.json({ message: "Liked!" });
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// POST: Dislike a video
router.post("/:id/dislike", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found." });

    await video.increment("dislikes");
    res.json({ message: "Disliked!" });
  } catch (error) {
    console.error("Dislike error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ error: "Video not found." });
    }

    res.json({
      id: video.id,
      title: video.title,
      video_url: `http://localhost:8000/uploads/${path.basename(video.path)}`,
      createdAt: video.createdAt,
      like: video.likes ,
      dislike: video.dislikes ,
      views: video.views || 0,
    });
  } catch (error) {
    console.error("Fetch video error:", error);
    res.status(500).json({ error: "Failed to fetch video." });
  }
});
router.post("/:id/comment", async (req, res) => {
  const { text, UserId } = req.body; // Ensure UserId and text are being passed
  const VideoId = parseInt(req.params.id, 10); // Get VideoId from URL param

  // Validate input data
  if (!text || !UserId || !VideoId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create a new comment in the database
    const comment = await Comment.create({
      text,
      UserId,    // Use 'UserId' as per your model
      VideoId,   // Use 'VideoId' as per your model
    });

    // Return the created comment
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ message: "Failed to post comment" });
  }
});



// GET: Fetch comments for a video

router.get("/:id/comment", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { VideoId: req.params.id },
      raw: true,
    });
    
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

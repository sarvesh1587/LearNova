const express = require("express");
const db = require("../db");

const router = express.Router();

// Helper: convert a raw DB row into API shape (parse JSON string columns)
function serializeCourse(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    thumbnail: row.thumbnail,
    price: row.price,
    discount: row.discount,
    educatorName: row.educator_name,
    courseContent: JSON.parse(row.course_content || "[]"),
    courseRatings: JSON.parse(row.course_ratings || "[]"),
    enrolledStudents: JSON.parse(row.enrolled_students || "[]"),
    createdAt: row.created_at,
  };
}

// GET /api/courses -> all courses
router.get("/", (req, res, next) => {
  try {
    const rows = db
      .prepare("SELECT * FROM courses ORDER BY created_at DESC")
      .all();
    res.json(rows.map(serializeCourse));
  } catch (err) {
    next(err);
  }
});

// GET /api/courses/:id -> single course
router.get("/:id", (req, res, next) => {
  try {
    const row = db
      .prepare("SELECT * FROM courses WHERE id = ?")
      .get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(serializeCourse(row));
  } catch (err) {
    next(err);
  }
});

// POST /api/courses -> create course (educator)
router.post("/", (req, res, next) => {
  try {
    const {
      title,
      description = "",
      thumbnail = "",
      price = 0,
      discount = 0,
      educatorName = "",
      courseContent = [],
      courseRatings = [],
      enrolledStudents = [],
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }

    const stmt = db.prepare(`
      INSERT INTO courses
        (title, description, thumbnail, price, discount, educator_name,
         course_content, course_ratings, enrolled_students)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      description,
      thumbnail,
      price,
      discount,
      educatorName,
      JSON.stringify(courseContent),
      JSON.stringify(courseRatings),
      JSON.stringify(enrolledStudents),
    );

    const row = db
      .prepare("SELECT * FROM courses WHERE id = ?")
      .get(result.lastInsertRowid);
    res.status(201).json(serializeCourse(row));
  } catch (err) {
    next(err);
  }
});

module.exports = router;

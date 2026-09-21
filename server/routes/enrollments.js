const express = require('express');
const db = require('../db');

const router = express.Router();

// GET /api/enrollments/:userId
// Returns full enrollment objects (not just course IDs) so the frontend
// has the enrollment id it needs to PUT progress, plus current progress.
router.get('/:userId', (req, res, next) => {
  try {
    const rows = db
      .prepare('SELECT * FROM enrollments WHERE user_id = ?')
      .all(req.params.userId);

    res.json(
      rows.map((r) => ({
        id: r.id,
        courseId: r.course_id,
        completedLectures: JSON.parse(r.completed_lectures || '[]'),
        enrolledAt: r.enrolled_at,
      })),
    );
  } catch (err) {
    next(err);
  }
});

// POST /api/enrollments -> body { userId, courseId } -> creates enrollment
router.post('/', (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'userId and courseId are required' });
    }

    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const existing = db
      .prepare('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?')
      .get(userId, courseId);

    if (existing) {
      return res.status(200).json({
        id: existing.id,
        courseId: existing.course_id,
        completedLectures: JSON.parse(existing.completed_lectures || '[]'),
        enrolledAt: existing.enrolled_at,
      });
    }

    const stmt = db.prepare(`
      INSERT INTO enrollments (user_id, course_id, completed_lectures)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(userId, courseId, JSON.stringify([]));

    // Also add userId to the course's enrolled_students JSON array
    const enrolledStudents = JSON.parse(course.enrolled_students || '[]');
    if (!enrolledStudents.includes(userId)) {
      enrolledStudents.push(userId);
      db.prepare('UPDATE courses SET enrolled_students = ? WHERE id = ?').run(
        JSON.stringify(enrolledStudents),
        courseId,
      );
    }

    const row = db.prepare('SELECT * FROM enrollments WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({
      id: row.id,
      courseId: row.course_id,
      completedLectures: JSON.parse(row.completed_lectures || '[]'),
      enrolledAt: row.enrolled_at,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/enrollments/:id/progress -> body { completedLectures: [] } -> updates
router.put('/:id/progress', (req, res, next) => {
  try {
    const { completedLectures } = req.body;

    if (!Array.isArray(completedLectures)) {
      return res.status(400).json({ error: 'completedLectures must be an array' });
    }

    const existing = db.prepare('SELECT * FROM enrollments WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    db.prepare('UPDATE enrollments SET completed_lectures = ? WHERE id = ?').run(
      JSON.stringify(completedLectures),
      req.params.id,
    );

    const row = db.prepare('SELECT * FROM enrollments WHERE id = ?').get(req.params.id);
    res.json({
      id: row.id,
      courseId: row.course_id,
      completedLectures: JSON.parse(row.completed_lectures || '[]'),
      enrolledAt: row.enrolled_at,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

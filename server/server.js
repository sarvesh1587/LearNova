require('dotenv').config();
const express = require('express');
const cors = require('cors');

const coursesRouter = require('./routes/courses');
const enrollmentsRouter = require('./routes/enrollments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // allow all origins
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'lms-backend' });
});

app.use('/api/courses', coursesRouter);
app.use('/api/enrollments', enrollmentsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`LMS backend running on port ${PORT}`);
});

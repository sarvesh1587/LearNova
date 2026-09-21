const db = require('./db');

const courses = [
  {
    title: 'Complete React Developer Course',
    description:
      'Master React from the ground up — hooks, context, routing, and real-world project patterns.',
    thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg',
    price: 49.99,
    discount: 20,
    educator_name: 'Ananya Sharma',
    course_content: [
      {
        chapterTitle: 'Getting Started with React',
        chapterContent: [
          {
            lectureTitle: 'Introduction to React & JSX',
            lectureDuration: 12,
            lectureUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
            isPreviewFree: true,
          },
          {
            lectureTitle: 'Components and Props',
            lectureDuration: 18,
            lectureUrl: 'https://www.youtube.com/watch?v=Rh3tobg7hEo',
            isPreviewFree: true,
          },
          {
            lectureTitle: 'State and Lifecycle',
            lectureDuration: 22,
            lectureUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
            isPreviewFree: false,
          },
        ],
      },
      {
        chapterTitle: 'Hooks Deep Dive',
        chapterContent: [
          {
            lectureTitle: 'useState and useEffect',
            lectureDuration: 25,
            lectureUrl: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'useContext and useReducer',
            lectureDuration: 20,
            lectureUrl: 'https://www.youtube.com/watch?v=6RhOzQciVwI',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Building Custom Hooks',
            lectureDuration: 17,
            lectureUrl: 'https://www.youtube.com/watch?v=J-g9ZJha8FE',
            isPreviewFree: false,
          },
        ],
      },
      {
        chapterTitle: 'Routing & Real-World Projects',
        chapterContent: [
          {
            lectureTitle: 'React Router Fundamentals',
            lectureDuration: 19,
            lectureUrl: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Building a Full Project',
            lectureDuration: 30,
            lectureUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            isPreviewFree: false,
          },
        ],
      },
    ],
    course_ratings: [{ rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 4 }, { rating: 5 }],
    enrolled_students: ['user_2mQwErTyAbCdEfGh', 'user_2nXpLmKjHgFdSaZx'],
  },
  {
    title: 'Node.js & Express Backend Mastery',
    description:
      'Build production-ready REST APIs with Node.js, Express, SQL databases, and deployment best practices.',
    thumbnail: 'https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg',
    price: 59.99,
    discount: 15,
    educator_name: 'Rohit Verma',
    course_content: [
      {
        chapterTitle: 'Node.js Fundamentals',
        chapterContent: [
          {
            lectureTitle: 'Introduction to Node.js',
            lectureDuration: 14,
            lectureUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
            isPreviewFree: true,
          },
          {
            lectureTitle: 'Modules and the Event Loop',
            lectureDuration: 20,
            lectureUrl: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
            isPreviewFree: true,
          },
          {
            lectureTitle: 'Working with npm',
            lectureDuration: 10,
            lectureUrl: 'https://www.youtube.com/watch?v=P3aKRdUyr0g',
            isPreviewFree: false,
          },
        ],
      },
      {
        chapterTitle: 'Building APIs with Express',
        chapterContent: [
          {
            lectureTitle: 'Routing and Middleware',
            lectureDuration: 23,
            lectureUrl: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Connecting to SQLite',
            lectureDuration: 26,
            lectureUrl: 'https://www.youtube.com/watch?v=byHcYRpMgI4',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Error Handling Patterns',
            lectureDuration: 15,
            lectureUrl: 'https://www.youtube.com/watch?v=SaXQoEmvV_E',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Deploying to Render',
            lectureDuration: 18,
            lectureUrl: 'https://www.youtube.com/watch?v=yiw6_JakZFc',
            isPreviewFree: false,
          },
        ],
      },
    ],
    course_ratings: [{ rating: 5 }, { rating: 5 }, { rating: 4 }],
    enrolled_students: ['user_2mQwErTyAbCdEfGh'],
  },
  {
    title: 'Python for Data Science Bootcamp',
    description:
      'Learn Python, NumPy, Pandas, and data visualization to kickstart your data science career.',
    thumbnail: 'https://img.youtube.com/vi/LHBE6Q9XlzI/maxresdefault.jpg',
    price: 44.99,
    discount: 25,
    educator_name: 'Priya Nair',
    course_content: [
      {
        chapterTitle: 'Python Basics',
        chapterContent: [
          {
            lectureTitle: 'Variables, Types, and Operators',
            lectureDuration: 16,
            lectureUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
            isPreviewFree: true,
          },
          {
            lectureTitle: 'Control Flow and Functions',
            lectureDuration: 21,
            lectureUrl: 'https://www.youtube.com/watch?v=9Os0o3wzS_I',
            isPreviewFree: true,
          },
          {
            lectureTitle: 'Working with Lists and Dicts',
            lectureDuration: 19,
            lectureUrl: 'https://www.youtube.com/watch?v=W8KRzm-HUcc',
            isPreviewFree: false,
          },
        ],
      },
      {
        chapterTitle: 'Data Analysis with Pandas',
        chapterContent: [
          {
            lectureTitle: 'Introduction to NumPy',
            lectureDuration: 24,
            lectureUrl: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Pandas DataFrames',
            lectureDuration: 28,
            lectureUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Data Cleaning Techniques',
            lectureDuration: 22,
            lectureUrl: 'https://www.youtube.com/watch?v=bDhvCp3_lYw',
            isPreviewFree: false,
          },
        ],
      },
      {
        chapterTitle: 'Visualization',
        chapterContent: [
          {
            lectureTitle: 'Matplotlib Essentials',
            lectureDuration: 20,
            lectureUrl: 'https://www.youtube.com/watch?v=3Xc3CA655Y4',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Seaborn for Statistical Plots',
            lectureDuration: 17,
            lectureUrl: 'https://www.youtube.com/watch?v=6GUZXDef2U0',
            isPreviewFree: false,
          },
        ],
      },
    ],
    course_ratings: [{ rating: 4 }, { rating: 5 }, { rating: 4 }, { rating: 3 }],
    enrolled_students: [],
  },
  {
    title: 'UI/UX Design Fundamentals with Figma',
    description:
      'Design polished, user-friendly interfaces from scratch using Figma, covering wireframes to prototypes.',
    thumbnail: 'https://img.youtube.com/vi/FTFaQWZBqQ8/maxresdefault.jpg',
    price: 39.99,
    discount: 10,
    educator_name: 'Kavya Reddy',
    course_content: [
      {
        chapterTitle: 'Design Foundations',
        chapterContent: [
          {
            lectureTitle: 'Principles of Visual Design',
            lectureDuration: 15,
            lectureUrl: 'https://www.youtube.com/watch?v=a5KYlHNKQB8',
            isPreviewFree: true,
          },
          {
            lectureTitle: 'Typography and Color Theory',
            lectureDuration: 18,
            lectureUrl: 'https://www.youtube.com/watch?v=sByzHoiYFX0',
            isPreviewFree: true,
          },
          {
            lectureTitle: 'Getting Started with Figma',
            lectureDuration: 14,
            lectureUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
            isPreviewFree: false,
          },
        ],
      },
      {
        chapterTitle: 'From Wireframes to Prototypes',
        chapterContent: [
          {
            lectureTitle: 'Low-Fidelity Wireframing',
            lectureDuration: 20,
            lectureUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Building a Design System',
            lectureDuration: 25,
            lectureUrl: 'https://www.youtube.com/watch?v=DPU2UwZ-8Iw',
            isPreviewFree: false,
          },
          {
            lectureTitle: 'Interactive Prototyping',
            lectureDuration: 23,
            lectureUrl: 'https://www.youtube.com/watch?v=jwCmIBJ8Jtc',
            isPreviewFree: false,
          },
        ],
      },
    ],
    course_ratings: [{ rating: 5 }, { rating: 5 }],
    enrolled_students: ['user_2nXpLmKjHgFdSaZx'],
  },
];

const insertCourse = db.prepare(`
  INSERT OR IGNORE INTO courses
    (id, title, description, thumbnail, price, discount, educator_name,
     course_content, course_ratings, enrolled_students)
  VALUES (@id, @title, @description, @thumbnail, @price, @discount, @educator_name,
          @course_content, @course_ratings, @enrolled_students)
`);

const seed = db.transaction((items) => {
  items.forEach((course, index) => {
    insertCourse.run({
      id: index + 1, // fixed ids so re-running with INSERT OR IGNORE is idempotent
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      price: course.price,
      discount: course.discount,
      educator_name: course.educator_name,
      course_content: JSON.stringify(course.course_content),
      course_ratings: JSON.stringify(course.course_ratings),
      enrolled_students: JSON.stringify(course.enrolled_students),
    });
  });
});

seed(courses);

console.log(`Seeded ${courses.length} courses.`);
process.exit(0);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user-routes");
const taskRouter = require("./routes/task-routes");

require("./database");
const app = express();

const FRONTEND_ORIGINS = [
  'https://mern-stack-task-app-jwt.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (FRONTEND_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, origin);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    maxAge: 86400,
  })
);

app.options('*', cors({ origin: FRONTEND_ORIGINS, credentials: true }));

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

// Basic API test
app.use("/api", (req, res) => {
  res.status(200).json({ message: "Hello Express" });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running. Use /api/... endpoints.' });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

// PORT for Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App is now running at port ${PORT}...`));

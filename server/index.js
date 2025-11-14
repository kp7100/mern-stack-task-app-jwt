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
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      if (FRONTEND_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // for debugging, allow other origins by echoing them back
        // comment the next line to reject unknown origins
        callback(null, origin);
        // to reject unknown origins, use: callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    maxAge: 86400,
  })
);

// ensure preflight is handled
app.options('*', cors({ origin: FRONTEND_ORIGINS, credentials: true }));

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.use("/api", (req, res) => {
  res.status(200).json({ message: "Hello Express" });
});

app.listen(4000, () => console.log(`App is now running at port 4000...`));

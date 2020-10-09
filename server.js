// Import Statements

import express from "express";
import dotenv from "dotenv";
import path  from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import helmet from "helmet";

// Routes
import spotify from './api/routes/spotify';
import login from './api/routes/login';
import queue from './api/routes/queue';

dotenv.config();
const app = express();
mongoose.set("useFindAndModify", false);

//Allow cross domains
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

// Include custom routing
app.use("/api/spotify", spotify);
app.use("/api/login", login);
app.use("/api/queue", queue);

//Connect to MLab database
const db = process.env.DB_URL;
mongoose.connect( db,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Use Routes
// app.use("/api/projects", projects);

//Enable Https only
// app.set('trust proxy', true);

// This is updated from the documentation so there isn't
// a warning anymore: https://github.com/helmetjs/hsts/issues/22
const hstsMiddleware = helmet.hsts({
  maxAge: 31536000
})

app.use((req, res, next) => {
  includeSubDomains: true;
  preload: true;
  if (req.secure) { hstsMiddleware(req, res, next) }
  else { next() }
})

// Redirect from non-www to www
// app.all(/.*/, (req, res, next) => {
//   if(req.headers.host.match(/^www/) == null)
//     res.redirect(301, 'https://www.' + req.headers.host + req.url);
//   else next();
// });

app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("App listening on port " + port);
});

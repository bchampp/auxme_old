import express from "express";
import dotenv from "dotenv";
import path  from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import helmet from "helmet";

//Config
import keys from "./config/keys";

//Routes
import projects from "./api/routes/projects";
import contractors from "./api/routes/contractors";
import project from "./api/routes/project";
import forms from "./api/routes/forms";
import users from "./api/routes/users";
import authHomeowner from "./api/routes/authHomeowner";
import authPM from "./api/routes/authPM";
import authSub from './api/routes/authSub';
import authCollab from './api/routes/authCollab';
import projectAccess from "./api/routes/projectAccess";
import stripe from "./api/routes/stripe";
import studio from "./api/routes/studio";
import material from "./api/routes/material";


import FormCustom from "./api/models/FormCustom";


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

//Connect to MLab database
const db = keys.mongoURI;
mongoose
  .connect(
    db,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
require("./api/tools/passport")(passport);

//Use Routes
app.use("/api/projects", projects);
app.use("/api/contractors", contractors);
app.use("/api/project", project);
app.use("/api/forms", forms);
app.use("/api/users", users);
app.use("/api/project-access", projectAccess);
app.use("/api/stripe", stripe);
app.use("/api/studio", studio);
app.use("/api/material", material);

//Authenticated Routes
app.use("/api/auth-homeowner", passport.authenticate("jwt", { session: false }), authHomeowner);
//UPDATE: need to put middleware allowing only PMs through
app.use("/api/auth-pm", passport.authenticate("jwt", { session: false }), authPM);
// app.use("/api/auth-project-access", passport.authenticate("jwt", { session: false }), projectAccess);
app.use('/api/auth-sub', passport.authenticate('jwt', {session: false}), authSub);
app.use('/api/auth-collab', passport.authenticate('jwt', {session: false}), authCollab);

//Enable Https only
app.set('trust proxy', true);

// This is updated from the documentation so there isn't
// a warning anymore: https://github.com/helmetjs/hsts/issues/22
const hstsMiddleware = helmet.hsts({
  maxAge: 31536000
})

app.use((req, res, next) => {
  includeSubDomains: true;
  preload: true;
  if (req.secure) {
    hstsMiddleware(req, res, next)
  } else {
    next()
  }
})

//Redirect from non-www to www
app.all(/.*/, (req, res, next) => {
  if(req.headers.host.match(/^www/) == null)
    res.redirect(301, 'https://www.' + req.headers.host + req.url);
  else next();
});

//Prerender node - for serving finished html for web crawlers
// app.use(require('prerender-node');
// app.use(require('prerender-node').set('prerenderToken', 'ACOUTERAS_TOKEN'));

app.use("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "robots.txt"));
});

app.use("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "sitemap.xml"));
});

app.use(express.static("client/build"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "200.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("App listening on port " + port);

  //For testing
  // let formsFound = FormCustom.find().sort({ $natural: -1 }).lean().limit(20).then(formsFound => {
  //   formsFound.forEach((form, i) => {
  //     console.log(form)
  //   })
  //
  // });

});

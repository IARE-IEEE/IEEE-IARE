var express = require("express");
const mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Database Connection
const DBUrl =
  "mongodb+srv://IEEEIARE:ieeeiare@cluster0.hdjok.mongodb.net/ieeeDatabase?retryWrites=true&w=majority";
mongoose
  .connect(DBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000), console.log("Connected"))
  .catch((err) => console.log(err));

//Event form data passing functions
const formSchema = new mongoose.Schema(
  {
    data: Object,
  },
  {
    collection: "events",
  }
);
const Form = mongoose.model("Form", formSchema);
const formData = (bodyData) => {
  Form({ data: bodyData }).save((err) => {
    if (err) {
      throw err;
    }
  });
};

//using ejs views
app.set("view engine", "ejs");

//using images and css files
app.use("/images", express.static("images"));
app.use("/css", express.static("css"));

//all pages
app.get("/", function (req, res) {
  res.render("ieee");
});
app.get("/events", function (req, res) {
  const Event = require("./models/events");
  Event.find({}, function (err, events) {
    if (err) console.warn(err);
    qrs = [];
    for (var i = 0; i < events.length; i++) {
      qrs.push(events[i].data);
    }
    res.render("IEEE_E", { qrs: qrs });
  });
});
app.get("/members", function (req, res) {
  res.render("IEEE_M");
});
app.post("/events.updatexyzabcd123", urlencodedParser, function (req, res) {
  formData(req.body);
  res.render("EventForm");
});
app.post("/eventlogin", urlencodedParser, function (req, res) {
  const a = "IeeeIare";
  const p = "ieee#_iare";
  const c = req.body.Name;
  const d = req.body.password;
  if (a === c && d === p) {
    res.render("EventForm");
  } else {
    res.render("EventUpdatelogin");
  }
});
app.get("/events.update", function (req, res) {
  res.render("EventUpdatelogin");
});

app.get("/wie", function (req, res) {
  res.render("wie");
});

app.get("/cs", function (req, res) {
  res.render("cs");
});

app.get("/sps", function (req, res) {
  res.render("sps");
});

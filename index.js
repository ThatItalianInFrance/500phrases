const express = require("express");
const app = express();
const eta = require("eta");
const fs = require("fs");
const PORT = process.env.PORT || 3030;
app.engine("eta", eta.renderFile);
eta.configure({ views: "./views", cache: true });
app.set("views", "./views");
app.set("view cache", true);
app.set("view engine", "eta");
app.use(express.static("assets"));

const jsonPath = "phrases.json";

function loadPhrases() {
  if (!fs.existsSync(jsonPath)) fs.writeFileSync(jsonPath, "[]", "utf8");
  let todosObj = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  if (!Array.isArray(todosObj)) todosObj = []; // ici petite sécurité pour éviter les erreurs si le fichier JSON est corrompu (si ce n'est pas un tableau)
  return todosObj;
}
let phrases = loadPhrases();

app.get("/", function (req, res) {
  phrases = loadPhrases();
  res.render("index.eta", { phrases });
});
app.get("/:id", function (req, res) {
  let checkQuery = function (id) {};
  id = req.params.id;
  console.log(id);
  console.log(typeof id);

  if (+id === NaN) {
    console.log("start of if id condition");
    phrases = loadPhrases();
    res.render("phrase.eta", { phrases });
    return;
  } else {
    phrases = loadPhrases();
    phrases = phrases.filter((word) => word.text.includes(id));

    console.log("else fired");
    res.render("index.eta", { phrases });
    return phrases;
  }
});
app.listen(PORT, function () {
  console.log("listening on port 3030");
});

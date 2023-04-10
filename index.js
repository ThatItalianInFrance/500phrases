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
  res.render("index.eta", { phrases });
});
app.get("/:id", function (req, res) {
  id = req.params.id;
  res.render("phrase.eta", { id, phrases });
});
app.listen(PORT, function () {
  console.log("listening on port 8000");
});

const fs = require("fs");
const express = require("express");
const app = express();
const eta = require("eta");
const bodyParser = require("body-parser");
const dayjs = require("dayjs");
const mysql = require("mysql2/promise");
const cors = require('cors');
const { log } = require("console");

app.use(cors())
app.engine("eta", eta.renderFile);
eta.configure({ views: "./views", cache: false });
app.set("views", "./views");
app.set("view cache", false);
app.set("view engine", "eta");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



let connection;
async function initMySQL() {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myshop",
  });
}

// les fonctions de gestion des produits en base de données
async function loadProducts(where = "1=1", orderBy = "name") {
  
  const [rows, fields] = await connection.query("SELECT * FROM products");
  return rows
}
async function loadProduct(id) {
 
  const [rows, fields] = await connection.query(`SELECT * FROM products WHERE id=${id}`);
  // console.log(rows);
  return rows
}
async function addProduct(product) {
  const [rows, fields] = await connection.query(
    'INSERT INTO products (name, description, price) VALUES (?, ?, ?)', 
    ["product", "description", "11"]
    );
    console.log(rows);
    return rows
}
async function updateProduct(id, product) {

  const [rows, fields] = await connection.query(
    `UPDATE products SET name=?, description=?, price=? WHERE id=${id}`,
    [product.name, product.description, product.price]
    );
    
    console.log(rows);
    
    return rows
}
async function removeProduct(id) {
  const [rows, fields] = await connection.query(
    'DELETE FROM products WHERE id=5'
    );
    console.log(rows);
    return rows
}

// les pages du site web
app.get("/", function (req, res) {
 
  res.redirect("/list");
});
app.get("/list", async function (req, res) {
 
  rows = await loadProducts()
  console.log(rows);
  
  res.render("list.eta", { rows });
});
app.get("/details/:id", async function (req, res) {
  id = req.params.id
  rows = await loadProduct(id);
  // console.log(rows);


  res.render("details.eta", {rows})
});

// les requêtes REST du backoffice
app.get("/office/products", async function (req, res) {
  let [,foo] = req.headers.authorization.split(" ");
  const [[dbtokenCheck]] = await connection.query(`SELECT * FROM users WHERE token="${foo}"`);
  if (!dbtokenCheck) {
    return res.status(401).send("Mommy please")
  } else {
  console.log(foo === dbtokenCheck.token);
  console.log(foo);
  console.log(dbtokenCheck.token);
  rows = await loadProducts()
  // console.log(rows);
  if (foo !== dbtokenCheck.token) {
    return res.status(401).send("Mommy please")
  } else {

  }
  res.send(rows)
}
});
app.get("/office/products/:id", async function (req, res) {
  id = req.params.id
  rows = await loadProduct(id)
  // console.log(rows);
  res.send(rows)
});
app.get("/office/login", function (req, res) {

  // console.log(rows);
  res.send(rows)
});
app.post("/office/products", async function (req, res) {
rows = await addProduct();
res.send(rows)
});
app.post("/office/login", async function (req, res) {


  
  let name = req.body.name;
  let pwd = req.body.password;

  const [rows, fields] = await connection.query(`SELECT * FROM users WHERE name="${name}" AND password=SHA1('${pwd}')`);

  if (rows.length == 0) {
    return res.status(401).send("Mommy please")
  } else {

  }
// console.log(rows[0]);
res.send(rows[0])
});
app.put("/office/products/:id", async function (req, res) {
  product = req.body
  console.log(req.body)
  id = req.params.id
  txt = req.
  rows = await updateProduct(id, product)
  console.log(rows);
  res.send(rows)
});
app.delete("/office/products/:id", async function (req, res) {
  id = req.params.id
  rows = await removeProduct(id)
  // console.log(rows);
  res.send(rows)
});

app.listen(8000, async function () {
  console.log("listening on port 8000");
  await initMySQL();
});



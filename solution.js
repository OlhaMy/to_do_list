import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ToDoListe",
  password: "Asdfgh1234",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items_today = [];

let items_week = [];

let items_month = [];


app.get("/", async (req, res) => {
  try {
    const result_today = await db.query("SELECT * FROM heute ORDER BY id ASC");
    items_today = result_today.rows;

    const result_week = await db.query("SELECT * FROM woche ORDER BY id ASC");
    items_week = result_week.rows;

    const result_month = await db.query("SELECT * FROM monat ORDER BY id ASC");
    items_month = result_month.rows;

    res.render("index.ejs", {
      listTitle_today:"Heute", 
      listItems_today: items_today, 

      listTitle_week:"Woche", 
      listItems_week: items_week, 

      listTitle_month:"Monat", 
      listItems_month: items_month, 
    });
  } catch (err) {
    console.log(err);
  }
});


app.post("/add", async (req, res) => {
  const item_today = req.body.newItem_today;

  const item_week = req.body.newItem_week;

  const item_month = req.body.newItem_month;

  // items.push({title: item});
  try {
    if (item_today){
      await db.query("INSERT INTO heute (title) VALUES ($1)", [item_today]);
      res.redirect("/");
    }
    if (item_week){
      await db.query("INSERT INTO woche (title) VALUES ($1)", [item_week]);
      res.redirect("/");
    }

    if (item_month){
      await db.query("INSERT INTO monat (title) VALUES ($1)", [item_month]);
      res.redirect("/");
    }

  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item_today = req.body.updatedItemTitle_today;
  const id_today = req.body.updatedItemId_today;

  const item_week = req.body.updatedItemTitle_week;
  const id_week = req.body.updatedItemId_week;

  const item_month = req.body.updatedItemTitle_month;
  const id_month = req.body.updatedItemId_month;


  try {
    await db.query("UPDATE heute SET title = ($1) WHERE id = $2", [item_today, id_today]);
    res.redirect("/");

    await db.query("UPDATE woche SET title = ($1) WHERE id = $2", [item_week, id_week]);
    res.redirect("/");

    await db.query("UPDATE monat SET title = ($1) WHERE id = $2", [item_month, id_month]);
    res.redirect("/");

  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id_today = req.body.deleteItemId_today;

  const id_week = req.body.deleteItemId_week;

  const id_month = req.body.deleteItemId_month;
  try {
    await db.query("DELETE FROM heute WHERE id = $1", [id_today]);

    await db.query("DELETE FROM woche WHERE id = $1", [id_week]);

    await db.query("DELETE FROM monat WHERE id = $1", [id_month]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

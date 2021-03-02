const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    // res.json(req.user);
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user]
    // );
    const user = await pool.query(
      "select users.user_name, employees.employ_name, employees.gender, employees.designation, employees.city from users LEFT JOIN employees on users.user_id = employees.user_id WHERE users.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/employees", authorization, async (req, res) => {
  try {
    const { ename, gender, designation, city } = req.body;

    const newEmploy = await pool.query(
      "INSERT INTO employees (user_id, employ_name, gender, designation, city) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, ename, gender, designation, city]
    );
    res.json(newEmploy.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

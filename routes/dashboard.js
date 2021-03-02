const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("select * from employees");

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/employees", authorization, async (req, res) => {
  try {
    const { employ_name, gender, designation, city } = req.body;

    const newEmploy = await pool.query(
      "INSERT INTO employees (employ_name, gender, designation, city) VALUES ($1, $2, $3, $4) RETURNING *",
      [employ_name, gender, designation, city]
    );
    res.json(newEmploy.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/employees/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { employ_name, gender, designation, city } = req.body;
    const editEmploy = await pool.query(
      "UPDATE employees SET employ_name = $1, gender = $2, designation = $3, city = $4 WHERE user_id = $5 RETURNING *",
      [employ_name, gender, designation, city, id]
    );

    if (editEmploy.rows.length === 0) {
      return res.json("somethings is odd");
    }

    res.json("Employee was updated");
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/employees/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query(
      "DELETE FROM employees WHERE user_id = $1 RETURNING *",
      [id]
    );

    if (deleteEmployee.rows.length === 0) {
      return res.json("check query again");
    }

    res.json("Employee was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

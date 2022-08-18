const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./Db");
const path = require("path");
const { nextTick } = require("process");
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); // => allows us to access the req.body

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES//


//afm validator 
function validateAFM(afm) {
  if (!afm.match(/^\d{9}$/) || afm == '000000000')
      return false;

  var m = 1, sum = 0;
  for (var i = 7; i >= 0; i--) {
      m *= 2;
      sum += afm.charAt(i) * m;
  }

  if(sum % 11 % 10 == afm.charAt(8)) {
return true;
  }
}

//login route
app.use("/auth", require("./JwtAuth"));

//dashboard route
app.use("/dashboard", require("./Dashboard"));


//create an employee

app.post("/employee", async (req, res) => {
  try {
    const { firstName, lastName, birthDate, afm } = req.body;
    if(!validateAFM(afm)) {
      const customError = new Error("Λάθος ΑΦΜ");
      customError.status = 500;
      throw customError; 
    }
    const newEmployee = await pool.query(
      "INSERT INTO employees (firstName, lastName, birthDate, afm) VALUES($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, birthDate, afm]
    );
    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.send(err.message);
    res.status(err.status);
 }
});

//GET ALL
app.get("/employees", async (req, res) => {
  try {
    const { afm, page } = req.query;
    const limit = 5;

    if (!afm) {
      const countEmpl = await pool.query("SELECT COUNT(*) FROM employees");
      const startIndex = (page - 1) * limit;
      const allEmployees = await pool.query(
        "SELECT * FROM employees ORDER BY id OFFSET $1 LIMIT $2",
        [startIndex, limit]
      );

      const employeesElements = {
        totalEmployees: countEmpl.rows[0].count/1,
        employees: allEmployees.rows,
        countPages: countEmpl.rows[0].count / limit,
        pageNumber: page/1,
      };
      res.json(employeesElements);
    } else {
      const checkEmployee = await pool.query(
        "SELECT * FROM employees WHERE afm=$1",
        [afm]
      );
      if (checkEmployee.rows[0] == undefined) {
        res.json(null);
      } else {
        res.json(checkEmployee.rows[0]);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

//get an employee

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);
    res.json(employee.rows[0]);
  } catch (err) {
    console.error(null);
  }
});

//update an employee

app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, birthDate, afm } = req.body;

    if(!validateAFM(afm)) {
      const customError = new Error("Λάθος ΑΦΜ");
      customError.status = 500;
      throw customError; 
    }
    const updateEmployee = await pool.query(
      "UPDATE employees SET firstName=$1, lastName=$2, birthDate=$3, afm=$4 WHERE id = $5",
      [firstName, lastName, birthDate, afm, id]
    );
    res.json(updateEmployee.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.send(err.message);
    res.status(err.status);
  }
});

//delete an employee

app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query(
      "DELETE FROM employees WHERE id=$1",
      [id]
    );
    res.json(deleteEmployee.rows[0]);
  } catch (err) {
    console.error(null);
  }
});

//start server on PORT
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

//client errors sent on server
//

import React, { Fragment, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { DatePicker } from "@mui/lab";

//client
const client = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { token: localStorage.token },
});

const EditEmployee = (setAuth) => {
  const [updateEmployee, setUpdateEmployee] = useState({
    firstName: null,
    lastName: null,
    birthDate: null,
    afm: null,
  });
  //textfield errors states
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const params = useParams();

  //Load Employee//
  const loadEmployee = async (id) => {
    const response = await client.get(`/employees/${id}`);
    const employee = await response.data;

    setUpdateEmployee({
      firstName: employee.firstname,
      lastName: employee.lastname,
      birthDate: FormatBday(employee.birthdate),
      afm: employee.afm,
    });
  };

  //useEffect
  useEffect(() => {
    if (params.id) {
      loadEmployee(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  //edit employee function

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (updateEmployee.firstName === null) {
        setErrorFirstName(true);
      } else if (updateEmployee.lastName === null) {
        setErrorLastName(true);
      } else {
        await client
          .put(`/employees/${params.id}`, updateEmployee)
          .then((response) => {
            if (response?.data) {
              setErrorMessage("Λάθος ΑΦΜ!");
              throw Error();
            } else {
              navigate("/");
            }
          });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //format birthday date //
  const FormatBday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-CA");
  };

  return (
    <Fragment>
      <Dialog open>
        <DialogTitle>ΕΓΓΡΑΦΗ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Επεξεργαστείτε τα στοιχεία του υπαλλήλου.
          </DialogContentText>
          <TextField
            error={errorFirstName}
            helperText={
              errorFirstName ? "Το πεδίο Όνομα δεν μπορεί να είναι κενό" : null
            }
            autoFocus
            margin="dense"
            id="name"
            label="ΟΝΟΜΑ"
            type="text"
            fullWidth
            variant="standard"
            value={updateEmployee.firstName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setUpdateEmployee({
                ...updateEmployee,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            error={errorLastName}
            helperText={
              errorLastName ? "Το πεδίο Επώνυμο δεν μπορεί να είναι κενό" : null
            }
            margin="dense"
            id="name"
            label="ΕΠΩΝΥΜΟ"
            type="text"
            fullWidth
            variant="standard"
            value={updateEmployee.lastName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setUpdateEmployee({
                ...updateEmployee,
                lastName: e.target.value,
              })
            }
          />
          <DatePicker
            inputFormat="dd/MM/yyyy"
            label="ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ"
            value={new Date(updateEmployee.birthDate)}
            onChange={(date) => {
              setUpdateEmployee({
                ...updateEmployee,
                birthDate: FormatBday(date),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField
            margin="dense"
            id="name"
            label="ΑΦΜ"
            type="text"
            fullWidth
            variant="standard"
            value={updateEmployee.afm}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setUpdateEmployee({
                ...updateEmployee,
                afm: e.target.value,
              })
            }
          />
        </DialogContent>
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong> {errorMessage} </strong>
          </Alert>
        )}
        <DialogActions>
          <Button onClick={() => navigate("/")}>ΕΞΟΔΟΣ</Button>
          <Button onClick={(e) => onSubmitForm(e)}>ΕΝΗΜΕΡΩΣΗ</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditEmployee;

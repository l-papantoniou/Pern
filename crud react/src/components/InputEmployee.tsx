import React, { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { DatePicker } from "@mui/lab";

//client
const client = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { token: localStorage.token },
});

const InputEmployee = (setAuth) => {
  const [newEmployee, setNewEmployee] = useState({
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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (newEmployee.firstName === null) {
        setErrorFirstName(true);
      } else if (newEmployee.lastName === null) {
        setErrorLastName(true);
      } else
        await client.post("/employee", newEmployee).then((response) => {
          if (!response?.data?.id) {
            setErrorMessage("Λάθος ΑΦΜ!");
            throw Error();
          } else {
            navigate("/");
          }
        });
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
            Εισάγετε τα στοιχεία του υπαλλήλου.
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
            value={newEmployee.firstName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
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
            id="lastName"
            label="ΕΠΩΝΥΜΟ"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.lastName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                lastName: e.target.value,
              })
            }
          />

          <DatePicker
            inputFormat="dd/MM/yyyy"
            label="ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ"
            value={new Date(newEmployee.birthDate)}
            onChange={(date) => {
              setNewEmployee({
                ...newEmployee,
                birthDate: FormatBday(date),
              });
            }}
            renderInput={(props) => <TextField {...props} />}
          />

          <TextField
            margin="dense"
            id="afm"
            label="ΑΦΜ"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.afm}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
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
          <Button type="submit" onClick={onSubmitForm}>
            ΕΓΓΡΑΦΗ
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default InputEmployee;

import React, { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

//client
const client = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { token: localStorage.token },
});

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //styles
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
    marginTop: "20px",
  };
  const btnstyle = { margin: "8px 0" };

  //error on login
  const [errorMessage, setErrorMessage] = useState(" ");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await client
        .post("http://localhost:5000/auth/login", inputs)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            setAuth(true);
          }
        })
        .catch(() => {
          setAuth(false);
          setErrorMessage("Λάθος email ή κωδικός!");
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Dialog open>
        <Grid container justify="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid container justify="center">
          <DialogTitle>Sign In</DialogTitle>
        </Grid>

        <DialogContent>
          <DialogContentText>Συνδεθείτε για να συνεχίσετε :</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="email"
            type="email"
            fullWidth
            variant="standard"
            value={inputs.email}
            onChange={(e) =>
              setInputs({
                ...inputs,
                email: e.target.value,
              })
            }
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            fullWidth
            variant="standard"
            value={inputs.password}
            onChange={(e) =>
              setInputs({
                ...inputs,
                password: e.target.value,
              })
            }
            required
          />
          {errorMessage && errorMessage.length > 1 && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong> {errorMessage} </strong>
            </Alert>
          )}
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              onClick={onSubmit}
            >
              Συνδεση
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Login;

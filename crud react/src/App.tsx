import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";

//components

import Login from "./components/Login";
import InputEmployee from "./components/InputEmployee";
import ListEmployees from "./components/ListEmployees";
import EditEmployee from "./components/EditEmployee";
import ButtonAppBar from "./components/Navbar";

//client
const client = axios.create({
  baseURL: "http://localhost:5000/",
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage?.token?.length > 0? true : false);

  const setAuth = (boolean) => {
    return setIsAuthenticated(boolean);
  };

  //We hit the jwtAuth endpoint to check if the person is still verified
  const checkAuthenticated = async () => {
    try {
      await client
        .post("http://localhost:5000/auth/verify", {
          headers: { token: localStorage.token },
        })
        .then((res) => {
          res.status === 200
            ? setIsAuthenticated(true)
            : setIsAuthenticated(false);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  });
  console.log(isAuthenticated);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Fragment>
          <Container fixed>
            <ButtonAppBar />
            <Routes>
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <ListEmployees setAuth={setAuth} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/employees/new"
                element={
                  isAuthenticated ? (
                    <InputEmployee setAuth={setAuth} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/employees/:id/edit"
                element={
                  isAuthenticated ? (
                    <EditEmployee setAuth={setAuth} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </Container>
        </Fragment>
      </Router>
    </LocalizationProvider>
  );
};

export default App;

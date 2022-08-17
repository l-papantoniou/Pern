import React, { ChangeEventHandler, useState } from "react";
import Button from "@mui/material/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { AppBar, Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import DarkMode from "./DarkMode";
import Grid from "@material-ui/core/Grid";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 2, paddingTop: 7 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ color: "#808080" }}
            >
              ΛΙΣΤΑ ΥΠΑΛΛΗΛΩΝ
            </Typography>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="success"
                startIcon={<PersonAddAltIcon />}
                onClick={() => navigate("/employees/new")}
              >
                ΠΡΟΣΘΗΚΗ ΥΠΑΛΛΗΛΟΥ
              </Button>
            </Grid>
            <DarkMode />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

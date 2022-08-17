import React from "react";
import Button from "@mui/material/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { AppBar, Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            <Typography
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ color: "#808080" }}
            >
              https://github.com/LamprosPapantoniou/CRUD-PERN-APP
            </Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<PersonAddAltIcon />}
              onClick={() => navigate("/employees/new")}
            >
              ΠΡΟΣΘΗΚΗ ΥΠΑΛΛΗΛΟΥ
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

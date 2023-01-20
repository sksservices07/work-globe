import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#474747",
        },
      },
    },
  },
});

const JobPostNavBar = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Box component="nav" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography
              variant="h5"
              component="h1"
              sx={{ flexGrow: 1, textAlign: "left", ml: 2 }}
            >
              Job Portal
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default JobPostNavBar;

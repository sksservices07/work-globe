import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {  IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";

const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#7FB4AD",
                }
            }
        }
    }
});
const ApplicationNavbar = () => {
    const location = useLocation();
  const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="h1" sx={{ flexGrow: 1, textAlign: "left" }}>
                   
            <Typography variant="h6" component="h2"  sx={{ flexGrow: 1, textAlign: "left",fontSize:{
                xs:"0.8rem",
                sm:"1.5rem"
              } }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
              Apply for Position at {location.state.companyName} for &nbsp;
              {location.state.position}
            </Typography> 
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default ApplicationNavbar;
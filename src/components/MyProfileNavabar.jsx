import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {  IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const MyProfileNavbar = () => {
    
  const navigate = useNavigate();
    return (
        
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="h1" sx={{ flexGrow: 1, textAlign: "left",   m:3 }}>
                    <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
                     My Profile
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default MyProfileNavbar;
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#474747",
                }
            }
        }
    }
});

const EmployerNavBar = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="h1" sx={{ flexGrow: 1, textAlign: "left" }}>
                        Browse Job by Category
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default EmployerNavBar;
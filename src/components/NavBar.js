import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, IconButton } from '@mui/material';
import { Box } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';


const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#474747',
                }
            }
        }
    }
});

const NavBar = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box component="nav" sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <img src={require('../img/logo192.png')} alt="Logo" height={30} width={30} />
                        <Typography variant="h6" component="p" sx={{ flexGrow: 1, textAlign: 'left', ml: 2 }}>WorkGLOBE</Typography>
                        <IconButton
                            size="large"
                            aria-label="home"
                            color="inherit"
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="contact"
                            color="inherit"
                        >
                            <EmailIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="about"
                            color="inherit"
                        >
                            <InfoIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}

export default NavBar;
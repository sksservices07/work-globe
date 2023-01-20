/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import NavBar from '../components/NavBar'

import * as React from 'react'

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                }
            }
        }
    }
});

const backgroundStyles = css`
    background-color: #f5f5f5;
    background-image: url(${require('../img/macbook-pro.jpg')});
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: left;
    padding: 0 300px;
    justify-content: flex-start;
`;

const textStylesH1 = css`
    color: white;
    font-size: 3rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    text-shadow: 1px 1px black;
    width: 350px;
`;

const textStylesP = css`
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 25px;
    text-shadow: 1px 1px black;
`;

const buttonStyles = css`
    margin-top: 1rem;
    margin-right: 1rem;
    justify-content: center;
    border-radius: 25px;
    width: 200px;
    height: 50px;
    background-color: white;
    color: black;
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.05);
        background-color: aliceblue;
    }
`;

const buttonContainerStyles = css`
    display: block;
    margin-bottom: 100px;
`;


function Landing() {

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <div css={backgroundStyles}>
                <div css={buttonContainerStyles}>
                    <h1 css={textStylesH1}>ONE BILLION PEOPLE USE ONLINE JOB PORTALS</h1>
                    <p css={textStylesP}>Stay protected by the power of smart contract embeddedin the realm of Blockchain</p>
                    <Link to="/employer">
                        <Button
                            css={buttonStyles}
                            variant="contained"
                            color="primary"
                        >
                            I AM A FREELANCER
                        </Button>
                    </Link>
                    <Link to="/freelancer">
                        <Button
                            css={buttonStyles}
                            variant="contained"
                            color="primary"
                        >
                            HIRE A FREELANCER
                        </Button>
                    </Link>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Landing
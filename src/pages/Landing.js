/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'

import * as React from 'react'

const backgroundStyles = css`
    background-color: #f5f5f5;
    background-image: url(${require('../img/macbook-pro.jpg')});
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 300px;
    justify-content: flex-start;
`;

const textStylesH1 = css`
    color: black;
    font-size: 3rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    text-shadow: 1px 1px black;
`;

const textStylesP = css`
    color: black;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    text-shadow: 1px 1px black;
`;

const buttonStyles = css`
    margin-top: 1rem;
    margin-right: 1rem;
    justify-content: center;
    border-radius: 25px;
    width: 200px;
    height: 50px;
`;

const buttonContainerStyles = css`
    display: block;
`;


function Landing() {

    return (
        <>
            <div css={backgroundStyles}>
                <div css={buttonContainerStyles}>
                    <h1 css={textStylesH1}>ONE BILLION PEOPLE USE ONLINE JOB PORTALS</h1>
                    <p css={textStylesP}>Stay protected by the power of smart contract embeddedin the realm of Blockchain</p>
                    <Button css={buttonStyles} variant="contained" color="primary">I AM A FREELANCER</Button>
                    <Button css={buttonStyles} variant="contained" color="primary">HIRE A FREELANCER</Button>
                </div>
            </div>
        </>
    )
}

export default Landing
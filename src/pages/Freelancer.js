import * as React from 'react'
import FreelanceNavBar from '../components/FreelanceNavBar'

import { Box, Paper, Typography, ButtonBase } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// "
// text-align: left;
// align-items: flex-start;
// display: flex;
// "

const Freelancer = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            flexGrow: 1,
        }}>
            <FreelanceNavBar />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: 1.2,
            }}>
                <ButtonBase
                    onClick={() => {
                        navigate('/jobpost', {state: {company: 'Netflix', role: 'Senior Web Developer', experience: '3 yrs experience'}});
                    }}
                >
                    <Paper elevation={3} sx={{ p: 2, width: '30vw', display: 'flex', alignItems: 'center' }}>
                        <img src={require('../img/netflix-512.png')} alt="netflix" height={100} width={100} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'black' }}>
                                Senior Web Developher
                            </Typography>
                            <Typography variant="subtitle2" component="p" sx={{ textAlign: 'left', ml: 1, color: 'black' }}>
                                3 yrs experience
                            </Typography>
                        </Box>
                    </Paper>
                </ButtonBase>
                <ButtonBase
                    onClick={() => {
                        navigate('/jobpost', {state: {company: 'Tata', role: 'Full Stack Web Developer', experience: '1 yrs experience'}});
                    }}
                >
                    <Paper elevation={3} sx={{ p: 2, width: '30vw', display: 'flex', alignItems: 'center' }}>
                        <img src={require('../img/tata-logo-blue.png')} alt="tata" height={100} width={100} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'black' }}>
                                Full Stack Web Developer
                            </Typography>
                            <Typography variant="subtitle2" component="p" sx={{ textAlign: 'left', ml: 1, color: 'black' }}>
                                1 yrs experience
                            </Typography>
                        </Box>
                    </Paper>
                </ButtonBase>
                <ButtonBase
                    onClick={() => {
                        navigate('/jobpost', {state: {company: 'Wipro', role: 'Full Stack Web Developer', experience: '13 yrs experience'}});
                    }}
                >
                    <Paper elevation={3} sx={{ p: 2, width: '30vw', display: 'flex', alignItems: 'center' }}>
                        <img src={require('../img/wipro-logo.png')} alt="wipro" height={100} width={100} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'black' }}>
                                Full Stack Web Developer
                            </Typography>
                            <Typography variant="subtitle2" component="p" sx={{ textAlign: 'left', ml: 1, color: 'black' }}>
                                13 yrs experience
                            </Typography>
                        </Box>
                    </Paper>
                </ButtonBase>
            </Box>
        </Box>
    )
}

export default Freelancer
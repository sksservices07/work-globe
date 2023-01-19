import * as React from 'react'
import FreelanceNavBar from '../components/FreelanceNavBar'

import { Box, Paper, Typography } from '@mui/material'
// "
// text-align: left;
// align-items: flex-start;
// display: flex;
// "

const Freelancer = () => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: '#f5f5f5',
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
                <Paper elevation={3} sx={{ p: 2, width: '30vw', display: 'flex', alignItems: 'center'}}>
                    <img src={require('../img/netflix-512.png')} alt="netflix" height={100} width={100} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'black' }}>
                            Senior Web Developer
                        </Typography>
                        <Typography variant="subtitle2" component="p" sx={{ textAlign: 'left', ml: 1, color: 'black' }}>
                            3 yrs experience
                        </Typography>
                    </Box>
                     
                </Paper>
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
            </Box>
        </Box>
    )
}

export default Freelancer
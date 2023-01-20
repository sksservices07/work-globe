import * as React from 'react';

import { Box, IconButton, Paper, Typography, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#595959",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Footer = () => {
    return (
        <>
            {/* <h1>tmkc</h1> */}
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ alignText: 'left', color: 'white', backgroundColor: "#595959" }}>
                    <Box sx={{ display: 'flex', gap: '2' }}>
                        <Typography variant="subtitle1" component="div" sx={{ textAlign: 'left', ml: 1 }}>
                            Follow us on:
                            <IconButton>
                                <FacebookIcon sx={{ color: 'white', }} />
                            </IconButton>
                            <IconButton>
                                <TwitterIcon sx={{ color: 'white', }} />
                            </IconButton>
                            <IconButton>
                                <LinkedInIcon sx={{ color: 'white', }} />
                            </IconButton>
                            <IconButton>
                                <InstagramIcon sx={{ color: 'white', }} />
                            </IconButton>
                            <IconButton>
                                <YouTubeIcon sx={{ color: 'white', }} />
                            </IconButton>
                        </Typography>
                    </Box>
                </Box>
                <Grid container spacing={0} sx={{ backgroundColor: '#595959' }}>
                    <Grid item xs={6}>
                        <Item variant="outline" square>
                            <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                Product by:
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item variant="outline" square >
                            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                    Resources:
                                </Typography>
                                <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                    Help and Support
                                </Typography>
                                <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                    Blog
                                </Typography>
                                <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                    Community
                                </Typography>
                                <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                    Affiliate Program
                                </Typography>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item variant="outline" square >
                            <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                For Talent
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                Find Work
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                Find Freelance work WorldWide
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ textAlign: 'left', ml: 1, color: 'white' }}>
                                Work in USA
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
                <Typography variant="h6" component="p" sx={{color: 'white', backgroundColor: '#595959'}}>
                    Work Globe
                </Typography>
                <Typography variant="subtitle1" component="p" sx={{color: 'white', backgroundColor: '#595959' }}>
                    Copyright ©2022
                </Typography>
            </Box>
        </>
    );
}

export default Footer;

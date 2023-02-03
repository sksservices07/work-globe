import * as React from "react";

import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

import JobPostNavBar from "../components/JobPostNavBar";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#1fe47a",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#1fe47a",
          },
        },
      },
    },
  },
});

const JobPost = () => {
  const location = useLocation();
  const applicants = ["Ram Sharma", "Shyam Sharma", "Karan Sharma"];
  return (
    <>
      <JobPostNavBar />
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={12}>
              <Typography variant="h3" component="p" sx={{ mt: 2 }}>
                Job Title:
                <Typography
                  variant="h3"
                  component="span"
                  sx={{ textDecoration: "underline black solid 5px" }}
                >
                  {location.state.companyName} for {location.state.position}
                </Typography>
              </Typography>
              <Typography variant="h6" component="p" sx={{ mt: 2 }}>
                Location:
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ textDecoration: "underline black solid 5px" }}
                >
                  {location.state.location}
                </Typography> &nbsp;&nbsp;
                Salary(per annum):
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ textDecoration: "underline black solid 5px" }}
                >
                  {location.state.salary} (in USD)
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  textAlign: "left",
                  mt: 3,
                  textDecoration: "underline black solid 4px",
                }}
              >
                Applicants
              </Typography>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={2} />
            {applicants.map((applicant, index) => (
              <>
                <Grid item xs={2} />
                <Grid item xs={5}>
                  <Paper elevation={3} sx={{ p: 2, textAlign: "left" }}>
                    <Typography variant="h6" component="p">
                      {index + 1}. {applicant} (CV Attached)
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" sx={{ width: "80%", p: 2 }}>
                    Select
                  </Button>
                </Grid>
                <Grid item xs={2} />
              </>
            ))}
            ;
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default JobPost;

import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const JobPostModal = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Tell Us About The Project
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Name of your project"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Experience"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Project Description"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Salary"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button variant="contained">Post Job</Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default JobPostModal;

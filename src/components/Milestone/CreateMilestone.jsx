import {
  Container,
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const CreateMilestone = () => {
  return (
    <Container maxWidth={false} sx={{ height: "100vh" }}>
      <Grid
        item
        sx={{ maxWidth: "70rem", width: "100%", backgroundColor: "#fff" }}
      >
        <Grid
          container
          sx={{
            boxShadow: { sm: "0 0 5px #ddd" },
            py: "6rem",
            px: "1rem",
          }}
        >
          <Grid
            item
            container
            justifyContent="center"
            rowSpacing={5}
            sx={{
              maxWidth: { sm: "45rem" },
              marginInline: "auto",
            }}
          >
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                flexDirection="column"
                component="form"
                noValidate
                autoComplete="off"
                sx={{ paddingRight: { sm: "3rem" } }}
              >
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{ textAlign: "center", mb: "1.5rem" }}
                >
                  Add milestone
                </Typography>

                <TextField
                  label="Amount"
                  type="text"
                  name="milestone-amount"
                  sx={{ mb: "10px" }}
                  required
                />

                <TextField
                  label="Amount"
                  type="text"
                  name="milestone-amount"
                  sx={{ mb: "10px" }}
                  required
                />

                <Button
                  variant="contained"
                  sx={{
                    py: "0.8rem",
                    mt: 2,
                    width: "80%",
                    marginInline: "auto",
                  }}
                >
                  Add Milestone
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateMilestone;

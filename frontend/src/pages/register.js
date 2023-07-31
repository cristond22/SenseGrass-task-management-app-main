import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    let route = process.env.ROUTE || "http://localhost:5000"
    event.preventDefault();
    try {
      const response = await axios.post(`${route}/auth/register`, formData); // Replace '/register' with your backend registration endpoint
      console.log(response.data);
      alert("User register")
      navigate('/login'); 
    } catch (error) {
      alert("Registration error")

      console.error(error);
      // Handle any errors if necessary
    }
  };
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <Grid container
        sx={{
            height:"60%",
          boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"

        }}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius:"8px 0 0 8px"
            }}
          />
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            square
            sx={{
                borderRadius:"0 8px 8px 0"

            }}
          >
            <form onSubmit={handleSubmit}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}

                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Box>
            </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Typography,
  Input,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

const ariaLabel = { "aria-label": "description" };
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [username, setEmail] = useState("");
  const [error, setError] = useState(false);
  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <Box
      mt={15}
      mb={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {error ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setError(false)}
        >
          <Alert onClose={() => setError(false)} severity="error" width="100%">
            Wrong Credentials
          </Alert>
        </Snackbar>
      ) : null}
      <Card
        sx={{
          borderStyle: "solid",
          borderWidth: "3px",
          borderColor: "#700070",
          borderRadius: "10px",
          width: { xs: "90%", sm: "400px" },
          minHeight: "250px",
          bgcolor: "#E6DEDC",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Stack display="flex" justifyContent="center" alignItems="center">
            <Typography
              sx={{ fontSize: "40px", fontFamily: "Grand Hotel" }}
              color="text.primary"
              gutterBottom
            >
              Admin Dashboard
            </Typography>
          </Stack>
          <Box
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr 1fr" },
              gap: 2,
            }}
          ></Box>
          <Stack
            mt={0}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              sx={{ width: "100%" }}
              placeholder="username"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={ariaLabel}
            />
          </Stack>
          <Stack
            mt={2}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              sx={{ width: "100%" }}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={ariaLabel}
            />
          </Stack>
          <Button
            onClick={() => handleClick()}
            sx={{ marginTop: "20px", fontSize: "13px" }}
            variant="contained"
            size="medium"
          >
            Login
          </Button>
          <Stack></Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;

import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <>
      <hr style={{ width: "100%", marginTop: "30px" }}></hr>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={3}
        mb={3}
      >
        <Typography sx={{ fontSize: { xs: "10px", sm: "12px" } }}>
          ORDER NOW
        </Typography>
        <Typography sx={{ fontSize: { xs: "8px", sm: "10px" } }}>
          +91 99XXX-XXX48
        </Typography>
        <br></br>
        <Typography sx={{ fontSize: { xs: "10px", sm: "12px" } }}>
          FIND OUR RESTAURANTS
        </Typography>
        <Typography sx={{ fontSize: { xs: "8px", sm: "10px" } }}>
          XYZ, Guwahati
        </Typography>
      </Box>
    </>
  );
};

import { Typography, Grid, Box } from "@mui/material";
import PizzaCard from "./PizzaCard";

export const PizzaList = ({ pizzaList }) => {
  return (
    <>
      <hr style={{ width: "100%", marginTop: "30px" }}></hr>
      <Box display="flex" justifyContent="center" mt="2%">
        <Typography
          sx={{ fontFamily: "Patrick Hand", fontSize: { xs: 20, sm: 40 } }}
        >
          Best Sellers
        </Typography>
      </Box>
      <Box display="grid" mt={3}>
        <Grid container pl="1%">
          {pizzaList.map((item, index) => {
            return <PizzaCard key={index} item={item} />;
          })}
        </Grid>
      </Box>
    </>
  );
};

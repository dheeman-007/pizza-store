import { Box, Typography, Stack, Radio, Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [selectedValue, setSelectedValue] = React.useState("b");
  const [cost, setCost] = React.useState(pizza?.price[1]);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    if (event.target.value === "a") setCost(pizza?.price[0]);
    if (event.target.value === "b") setCost(pizza?.price[1]);
    if (event.target.value === "c") setCost(pizza?.price[2]);
    setSelectedValue(event.target.value);
  };
  const handleClick = () => {
    dispatch(addProduct({ ...pizza, price: cost }));
  };
  return (
    <>
      <Box
        width="100%"
        display="flex"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          mt: { xs: 6, sm: 8 },
        }}
      >
        <Stack flex="1">
          <img src={pizza?.img} alt="Pizza" width="100%"></img>
        </Stack>
        <Stack flex="1">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "30px", sm: "50px" },
              mt: { xs: 1, sm: 3 },
              ml: { xs: 1.5, sm: 3 },
              mr: { xs: 1.5, sm: 3 },
            }}
          >
            {pizza?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "30px" },
              mt: { xs: 1, sm: 7 },
              ml: { xs: 1.5, sm: 3 },
              mr: { xs: 1.5, sm: 3 },
            }}
          >
            ${cost}
          </Typography>
          <Typography
            mt={2}
            sx={{ ml: { xs: 1.5, sm: 3 }, mr: { xs: 1.5, sm: 3 } }}
          >
            {pizza?.description}
          </Typography>
          <Box
            bgcolor="white"
            mt={2}
            sx={{ ml: { xs: 1.5, sm: 3 }, mr: { xs: 1.5, sm: 3 } }}
            color="black"
            borderRadius="10px"
          >
            <Radio
              checked={selectedValue === "a"}
              onChange={handleChange}
              value="a"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
            <Typography
              sx={{
                display: "inline",
                fontSize: { xs: "12px", sm: "15px" },
              }}
            >
              Small
            </Typography>
            <Radio
              checked={selectedValue === "b"}
              onChange={handleChange}
              value="b"
              name="radio-buttons"
              inputProps={{ "aria-label": "B" }}
            />
            <Typography
              sx={{
                display: "inline",
                fontSize: { xs: "12px", sm: "15px" },
              }}
            >
              Medium
            </Typography>
            <Radio
              checked={selectedValue === "c"}
              onChange={handleChange}
              value="c"
              name="radio-buttons"
              inputProps={{ "aria-label": "C" }}
            />
            <Typography
              sx={{
                display: "inline",
                fontSize: { xs: "12px", sm: "15px" },
              }}
            >
              Large
            </Typography>
          </Box>
          <Box
            sx={{
              mt: { xs: 4, sm: 7 },
              ml: { xs: 1.5, sm: 3 },
              mr: { xs: 1.5, sm: 3 },
            }}
          >
            <Button variant="contained" color="success" onClick={handleClick}>
              Add to cart
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;

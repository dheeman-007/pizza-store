import { Button, Box, Stack, Typography } from "@mui/material";
import axios from "axios";

function Order({ order }) {
  const status = (e) => {
    if (e == 1) return "Preparing";
    else if (e == 2) return "Out for Delivery";
    else return "Delivered";
  };
  return (
    <>
      <Box display="flex" flexDirection="row" mt={9} p="5%">
        <Stack flex="1" display="flex" flexDirection="column" pr="4px">
          <Typography sx={{ fontSize: { xs: "8px", sm: "11px" } }}>
            Order ID
          </Typography>
          <Typography sx={{ fontSize: { xs: "9px", sm: "12px" }, mt: "5px" }}>
            {order?._id}
          </Typography>
        </Stack>
        <Stack flex="1" display="flex" flexDirection="column">
          <Typography sx={{ fontSize: { xs: "8px", sm: "11px" } }}>
            Customer
          </Typography>
          <Typography sx={{ fontSize: { xs: "9px", sm: "12px" }, mt: "5px" }}>
            {order?.customer}
          </Typography>
        </Stack>
        <Stack flex="1" display="flex" flexDirection="column">
          <Typography sx={{ fontSize: { xs: "8px", sm: "11px" } }}>
            Address
          </Typography>
          <Typography sx={{ fontSize: { xs: "9px", sm: "12px" }, mt: "5px" }}>
            {order?.address}
          </Typography>
        </Stack>
        <Stack flex="1" display="flex" flexDirection="column">
          <Typography sx={{ fontSize: { xs: "8px", sm: "11px" } }}>
            Total
          </Typography>
          <Typography sx={{ fontSize: { xs: "9px", sm: "12px" }, mt: "5px" }}>
            ${order?.total}
          </Typography>
        </Stack>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center" mt={0}>
        <Box
          bgcolor="#1A1A1A"
          width="400px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          p={6}
        >
          <Typography variant="h5">Order Status</Typography>
          <Typography sx={{ mt: 2, fontSize: { xs: "9px", sm: "12px" } }}>
            Subtotal: ${order?.total}
          </Typography>
          <Typography sx={{ fontSize: { xs: "9px", sm: "12px" } }}>
            Discount: $0
          </Typography>
          <Typography sx={{ fontSize: { xs: "9px", sm: "12px" } }}>
            Total: ${order?.total}
          </Typography>
          <Typography sx={{ fontSize: { xs: "9px", sm: "12px" } }}>
            Status: {status(order?.status)}
          </Typography>
          <Button variant="contained" color="success" sx={{ mt: 2 }}>
            Paid
          </Button>
        </Box>
      </Box>
    </>
  );
}
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};
export default Order;

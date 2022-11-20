import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Typography, Grid, Box, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/cartSlice";
import { useRouter } from "next/router";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const amount = cart?.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const createorder = async (details) => {
    const res = await axios.post("http://localhost:3000/api/orders", details);
    res.status === 201 && router.push("/orders/" + res.data._id);
    dispatch(reset());
  };
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              createorder({
                customer: details?.purchase_units[0]?.shipping?.name?.full_name,
                address:
                  details?.purchase_units[0]?.shipping?.address?.address_line_1,
                total: cart?.total,
              });
            });
          }}
        />
      </>
    );
  };
  return (
    <>
      <Box
        p="10%"
        maxHeight="200px"
        pt={1}
        mt={8}
        width="100%"
        bgcolor="#1A1A1A"
        overflow="auto"
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            fontWeight={50}
            style={{
              flex: "1",
              fontSize: "20px",
              paddingLeft: "10px",
              fontWeight: "100px",
            }}
          >
            Product name
          </Typography>
          <Typography
            style={{ flex: "1", fontSize: "20px", paddingLeft: "10px" }}
          >
            Price
          </Typography>
        </Grid>
        <hr style={{ width: "100%", marginTop: "10px" }}></hr>
        {cart?.products?.map((product, index) => (
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
            key={index}
          >
            <Typography
              fontWeight={50}
              style={{
                flex: "1",
                fontSize: "14px",
                paddingLeft: "10px",
                fontWeight: "100px",
              }}
            >
              {index + 1}. {product?.title}
            </Typography>
            <Typography
              style={{ flex: "1", fontSize: "14px", paddingLeft: "10px" }}
            >
              ${product?.price}
            </Typography>
          </Grid>
        ))}
      </Box>
      <hr style={{ width: "100%", marginTop: "30px" }}></hr>
      <Box display="flex" flexDirection="row" justifyContent="center" mt={5}>
        <Box
          bgcolor="#1A1A1A"
          width="400px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pt={6}
          pb={6}
          sx={{ pl: { xs: "12%", sm: 6 }, pr: { xs: "12%", sm: 6 } }}
        >
          <Typography variant="h5">CART TOTAL</Typography>
          <Typography sx={{ mt: 2 }}>Subtotal: ${cart?.total}</Typography>
          <Typography>Discount: $0</Typography>
          <Typography sx={{ mb: "10px" }}>Total: ${cart?.total}</Typography>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AUC52BUwH5AVPnrW7s9T3G1J9Q0E3KgqHHRRSMtpWHDn2gxRgHLvfMC9H1b96SxvrcfoqjwDFX5-lAIH",
              components: "buttons",
              currency: "USD",
              "disable-funding": "credit,card,p24",
            }}
          >
            <ButtonWrapper currency={currency} showSpinner={false} />
          </PayPalScriptProvider>
        </Box>
      </Box>
    </>
  );
}

export default Cart;

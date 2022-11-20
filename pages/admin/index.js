import { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

function Admin({ orderList, productList }) {
  const router = useRouter();
  const [orders, setOrders] = useState(orderList);
  const [products, setProducts] = useState(productList);
  const handleDelete = async (id) => {
    const res = await axios.delete("http://localhost:3000/api/products/" + id);
    setProducts(products.filter((product) => product._id !== id));
  };
  const handleOrder = async (id, status) => {
    const res = await axios.put("http://localhost:3000/api/orders/" + id, {
      status: status + 1,
    });
    setOrders([res.data, ...orders.filter((order) => order._id != id)]);
  };
  const status = (e) => {
    if (e == 1) return "Preparing";
    else if (e == 2) return "Out for Delivery";
    else return "Delivered";
  };
  return (
    <>
      <button
        style={{
          marginTop: "100px",
          marginLeft: "8px",
          backgroundColor: "green",
          cursor: "pointer",
        }}
        onClick={() => router.push("/admin/add")}
      >
        Add Pizza
      </button>
      <Box
        display="flex"
        sx={{
          fontSize: { xs: "10px", sm: "15px" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box flex="1">
          <h6 style={{ fontSize: "20px", marginLeft: "8px" }}>Products</h6>
          <Box mb={5} maxHeight="300px" overflow="auto">
            <table
              width="100%"
              style={{
                borderSpacing: "10px",
                textAlign: "left",
                maxHeight: "300px",
              }}
            >
              <tbody>
                <tr style={{ fontSize: "11px" }}>
                  <th>Image</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                {products.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={product?.img}
                          alt="image"
                          height="50px"
                          width="50px"
                          style={{ borderRadius: "50%" }}
                        ></img>
                      </td>
                      <td>{product?._id.slice(0, 5)}...</td>
                      <td>{product?.title}</td>
                      <td>${product?.price[1]}</td>
                      <td>
                        <button
                          style={{
                            fontSize: "10px",
                            backgroundColor: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </Box>
        <Box flex="1">
          <h6 style={{ fontSize: "20px", marginLeft: "8px" }}>Orders</h6>
          <Box maxHeight="300px" overflow="auto">
            <table
              width="100%"
              style={{
                borderSpacing: "10px",
                textAlign: "left",
                maxHeight: "300px",
              }}
            >
              <tbody>
                <tr style={{ fontSize: "11px" }}>
                  <th>Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {orders.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{order?._id.slice(0, 5)}...</td>
                      <td>{order?.customer}</td>
                      <td>${order?.total}</td>
                      <td>{status(order?.status)}</td>
                      <td>
                        <button
                          style={{
                            fontSize: "10px",
                            backgroundColor: "green",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOrder(order._id, order?.status)}
                        >
                          Next Stage
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const products = await axios.get(`http://localhost:3000/api/products`);
  const orders = await axios.get(`http://localhost:3000/api/orders`);
  return {
    props: {
      orderList: orders.data,
      productList: products.data,
    },
  };
};

export default Admin;

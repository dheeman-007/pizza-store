import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Typography,
  Input,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const ariaLabel = { "aria-label": "description" };

function Add() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [small, setSmall] = useState("");
  const [medium, setMedium] = useState("");
  const [large, setLarge] = useState("");
  const [price, setPrice] = useState([0, 0, 0]);
  const [image, setImage] = useState("");
  const [img, setImg] = useState(undefined);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "food-delivery-app");
    formData.append("cloud_name", "dfhrkctjk");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dfhrkctjk/image/upload",
        formData
      );
      setImg(res.data.url);
      const newProduct = {
        title,
        description,
        img,
        price,
      };
      await axios.post("http://localhost:3000/api/products", newProduct);
      router.push("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  const changePrice = async (index, val) => {
    if (index === 0) {
      const temp = price;
      temp[0] = Number(val);
      setPrice(temp);
      setSmall(Number(val));
    } else if (index === 1) {
      const temp = price;
      temp[1] = Number(val);
      setPrice(temp);
      setMedium(Number(val));
    } else {
      const temp = price;
      temp[2] = Number(val);
      setPrice(temp);
      setLarge(Number(val));
    }
  };
  return (
    <Box
      mt={15}
      mb={15}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
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
              Add Pizza
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
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={ariaLabel}
            />
          </Stack>
          <Stack
            mt={2}
            width="100%"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="row"
          >
            <Input
              sx={{ width: "100%" }}
              placeholder="small $"
              value={small}
              onChange={(e) => changePrice(0, e.target.value)}
              inputProps={ariaLabel}
            />
            <Input
              sx={{ width: "100%" }}
              placeholder="medium $"
              value={medium}
              onChange={(e) => changePrice(1, e.target.value)}
              inputProps={ariaLabel}
            />
            <Input
              sx={{ width: "100%" }}
              placeholder="large $"
              value={large}
              onChange={(e) => changePrice(2, e.target.value)}
              inputProps={ariaLabel}
            />
          </Stack>
          <Stack
            mt={3}
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
          >
            <Typography sx={{ fontSize: "14px", color: "grey" }}>
              Pizza Picture:
            </Typography>
            <input
              style={{ paddingLeft: "10px" }}
              type="file"
              id="avatar"
              name="profile"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </Stack>
          <Button
            onClick={() => handleSubmit()}
            sx={{ marginTop: "20px", fontSize: "13px" }}
            variant="contained"
            size="medium"
          >
            Add
          </Button>
          <Stack></Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Add;

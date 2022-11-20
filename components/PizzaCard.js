import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import Link from "next/link";

export default function PizzaCard({ item }) {
  return (
    <Card sx={{ width: "32.3%", mr: "1%", mb: "1%" }}>
      <Link href={`/products/${item?._id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: { xs: "100px", sm: "200px" } }}
            image={item?.img}
            alt="green iguana"
          />
          <CardContent>
            <Typography sx={{ fontSize: { xs: "7px", sm: "14px" } }}>
              {item?.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "5px", sm: "12px" } }}
            >
              ${item?.price[0]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

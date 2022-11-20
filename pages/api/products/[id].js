import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { id },
  } = req;

  const token = cookies?.token || "";

  await dbConnect();

  if (method === "GET") {
    Product.findById(id).exec((err, result) => {
      if (err) return res.status(500).json({ error: err });
      else return res.status(200).json(result);
    });
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("You are not authenticated");
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(201).json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

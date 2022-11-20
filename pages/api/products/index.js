import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies?.token || "";

  await dbConnect();

  if (method === "GET") {
    Product.find().exec((err, result) => {
      if (err) return res.status(500).json({ error: err });
      else return res.status(200).json(result);
    });
  }
  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("You are not authenticated");
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

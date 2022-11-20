import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    Order.find().exec((err, result) => {
      if (err) return res.status(500).json({ error: err });
      else return res.status(200).json(result);
    });
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { id },
  } = req;

  const token = cookies?.token || "";
  await dbConnect();

  if (method === "GET") {
    Order.findById(id).exec((err, result) => {
      if (err) return res.status(500).json({ error: err });
      else return res.status(200).json(result);
    });
  }
  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("You are not authenticated");
    }
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

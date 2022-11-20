import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    if (
      req.body.username === process.env.ADMIN_USERNAME &&
      req.body.password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          httpOnly: true,
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Successful");
    } else {
      res.status(500).json("wrong credentials");
    }
  }
}

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    res.status(400).send({ message: "Authorization denied. No Token" });

  token = token.split(" ")[1];
  if (!token)
    res.status(400).send({ message: "Authorization denied. No Token" });
  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY_JWT);
    next();
  } catch (e) {
    res.status(400).send({ message: "Authorization denied. No Token" });
  }
};

export default auth;

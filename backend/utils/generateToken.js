import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const token = jwt.sign({ id }, "abc123", { expiresIn: "24h" });

  return token;
};


export default generateToken;

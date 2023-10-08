import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodeData;
    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, process.env.SECRET);
      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub;
    }
    next();
  } catch (error) {
    const refresh = req.headers?.refresh;
    if (refresh) {
      const decodeData = jwt.decode(refresh);
      if (decodeData) {
        const token = jwt.sign(
          { username: decodeData.username, id: decodeData.id },
          process.env.SECRET,
          { expiresIn: "5m" }
        );
        req.headers.authorization = `Bearer ${token}`;
        res.cookie("jwt", {
          maxAge: 1000 * 5 * 60, // 5m
          httpOnly: true,
          path: "/",
        });
        next();
      } else {
        res.clearCookie("jwt");
        res.clearCookie("refresh");
        return res
          .status(401)
          .json({ status: 401, message: "Login expried, please login again!" });
      }
    } else {
      res.clearCookie("jwt");
      res.clearCookie("refresh");
      return res
        .status(401)
        .json({ status: 401, message: "Login expried, please login again!" });
    }
  }
};

export default auth;

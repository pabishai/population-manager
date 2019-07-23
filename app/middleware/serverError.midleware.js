export default (req, res, next) => {
  res.status(500).send({
    message: "Opps!! something went wrong"
  });
  next();
};

export default (req, res, next) => {
  const { male, female, location } = req.body;

  if (
    (male && +male < 0) ||
    (female && +female < 0) ||
    (location && location < 0)
  ) {
    res.status(400).send({
      message: "Location, female and male fields can only be positive number"
    });
  }

  next();
};

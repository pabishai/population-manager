export default (req, res, next) => {
  const { location } = req.params;
  let message = "";
  if (!location) {
    message = "Please input the location to update";
  }

  if (isNaN(location)) {
    message = "location must be a number";
  }

  if (message) {
    return res.status(400).send({
      message
    });
  }

  return next();
};

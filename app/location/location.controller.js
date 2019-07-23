import Location from "./location.model";

export const addLocationPopulation = async (req, res, next) => {
  const { location, parentLocation, male, female } = req.body;

  let newLocationData = null;

  try {
    const existingLocation = await Location.findOne({ code: location });

    if (existingLocation) {
      return res.status(400).send({
        message: "location population already entered"
      });
    }

    let parent = null;

    if (parentLocation) {
      parent = await Location.findOne({ code: parentLocation });
      if (!parent) {
        return res.status(400).send({
          message: "invalid parent location"
        });
      }
    }

    newLocationData = await new Location({
      code: location,
      male,
      female
    }).save();

    if (parent) {
      parent.set({ subLocations: newLocationData._id });
      await parent.save();
    }
  } catch (error) {
    console.error(error);
    next();
  }

  return res.status(200).send(newLocationData);
};

export const viewPopulationData = async (req, res, next) => {
  const { location } = req.params;

  const params = {};

  if (location) {
    params.code = location;
  }

  let locationData = [];

  try {
    locationData = await Location.find(params)
      .select("-_id code total male female subLocations")
      .populate("subLocations");
  } catch (error) {
    console.log(error);
    next();
  }
  return res.status(200).send(locationData);
};

export const updatePopulationData = async (req, res, next) => {
  const { male, female } = req.body;
  const { location } = req.params;

  const params = {};

  if (male) {
    params.male = male;
  }

  if (female) {
    params.female = female;
  }

  let updatedLocation = null;

  try {
    updatedLocation = await Location.findOne({ code: location });
    if (!updatedLocation) {
      return res.status(404).send({
        message: "location not found"
      });
    }
    updatedLocation.set(params);
    await updatedLocation.save();
  } catch (error) {
    console.log(error);
    next();
  }
  return res.status(200).send(updatedLocation);
};

export const deleteLocation = async (req, res, next) => {
  const { location } = req.params;

  let deletedLocation = null;

  try {
    deletedLocation = await Location.findOneAndDelete(
      {
        code: location
      },
      { projection: { _id: 0, code: 1 } }
    );

    if (!deletedLocation) {
      res.status(404).send({
        message: "location not found"
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
  res.status(200).send({
    deleted: deletedLocation
  });
};

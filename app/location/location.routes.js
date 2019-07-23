import express from "express";
import {
  isNumberic,
  isOptionalAndNumeric
} from "../middleware/validators.middleware";
import validatorHandler from "../middleware/validatorHandler.middleware";
import validateUrlParams from "../middleware/validateUrlParam.middleware";

import {
  addLocationPopulation,
  updatePopulationData,
  viewPopulationData,
  deleteLocation
} from "./location.controller";

const router = express.Router();

router.post("", isNumberic, validatorHandler, addLocationPopulation);
router.put(
  "/:location",
  validateUrlParams,
  isOptionalAndNumeric,
  validatorHandler,
  updatePopulationData
);
router.get("", viewPopulationData);
router.get("/:location", viewPopulationData);
router.delete("/:location", validateUrlParams, deleteLocation);

export default router;

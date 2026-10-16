import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import {
  debtorBodySchema,
  debtorQuerySchema,
} from "../schemas/debtor.schema.js";
import {
  addDebtor,
  getOneDebtProfile,
  getAllDebtProfiles,
} from "../controllers/debtor.controller.js";
import { tabBodySchema, tabParamsSchema } from "../schemas/tab.schema.js";

const debtorsRouter = Router();

debtorsRouter.post(
  "/",
  validate({ body: debtorBodySchema.and(tabBodySchema) }),
  addDebtor
);

debtorsRouter.get(
  "/:debtorId/debt-profile",
  validate({ params: tabParamsSchema }),
  getOneDebtProfile
);

debtorsRouter.get(
  "/",
  validate({ query: debtorQuerySchema }),
  getAllDebtProfiles
);

export default debtorsRouter;

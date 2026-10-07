import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { debtorSchema } from "../schemas/debtor.schema.js";
import { addDebtor, getOneDebtProfile } from "../controllers/debtor.controller.js";
import { tabBodySchema, tabParamsSchema } from "../schemas/tab.schema.js";

const debtorsRouter = Router();

debtorsRouter.post(
  "/",
  validate({ body: debtorSchema.and(tabBodySchema) }),
  addDebtor
);

debtorsRouter.get(
  "/:debtorId/debt-profile",
  validate({ params: tabParamsSchema }),
  getOneDebtProfile
);

export default debtorsRouter;

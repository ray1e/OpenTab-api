import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { debtorSchema } from "../schemas/debtor.schema.js";
import { addDebtor } from "../controllers/debtor.controller.js";
import { tabSchema } from "../schemas/tab.schema.js";

const debtorsRouter = Router();

debtorsRouter.post("/", validate({ body: debtorSchema.and(tabSchema)}), addDebtor);

export default debtorsRouter;

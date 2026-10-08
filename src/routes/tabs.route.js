import { Router } from "express";
import {
  addNewTab,
  updateTab,
  deactivateTab,
  deleteTab,
} from "../controllers/tab.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  tabsBodySchema,
  tabUpdateBodySchema,
  tabIdParamsSchema,
} from "../schemas/tab.schema.js";

const tabsRouter = Router();

// add a tab
tabsRouter.post("/", validate({ body: tabsBodySchema }), addNewTab);

//mark a tab as paid
tabsRouter.patch(
  "/:tabId/deactivate",
  validate({ params: tabIdParamsSchema }),
  deactivateTab
);

// update a tab
tabsRouter.patch(
  "/:tabId",
  validate({ body: tabUpdateBodySchema, params: tabIdParamsSchema }),
  updateTab
);

// delete a tab
tabsRouter.delete("/:tabId", validate({ params: tabIdParamsSchema }), deleteTab);

export default tabsRouter;

import { Router } from "express";
import {
  addNewTab,
  updateTab,
  deactivateTab,
} from "../controllers/tab.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { tabsBodySchema, tabUpdateBodySchema } from "../schemas/tab.schema.js";

const tabsRouter = Router();

// add a tab
tabsRouter.post("/", validate({ body: tabsBodySchema }), addNewTab);

//remove a tab
tabsRouter.patch(
  "/:tabId/deactivate",
  validate({ body: tabUpdateBodySchema }),
  deactivateTab
);

// update a tab
tabsRouter.patch("/:tabId", validate({ body: tabUpdateBodySchema }), updateTab);

//

export default tabsRouter;

import { Router } from "express";
import { addNewTab, updateTab } from "../controllers/tab.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { tabsBodySchema, tabUpdateBodySchema } from "../schemas/tab.schema.js";

const tabsRouter = Router();

// add a tab
tabsRouter.post("/", validate({ body: tabsBodySchema }), addNewTab);

//remove a tab

// update a tab
tabsRouter.patch("/:tabId", validate({ body: tabUpdateBodySchema }), updateTab);

//

export default tabsRouter;

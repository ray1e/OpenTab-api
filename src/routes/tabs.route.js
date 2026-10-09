import { Router } from "express";
import {
  addNewTab,
  updateTab,
  deactivateTab,
  deleteTab,
  deleteManyTabs,
  addItems,
  deleteItem,
  deleteManyItems,
} from "../controllers/tab.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  tabsBodySchema,
  tabUpdateBodySchema,
  tabIdParamsSchema,
  tabItemParamsSchema,
  deleteManyTabsSchema,
  addItemsBodySchema,
  deleteManyItemsSchema,
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
tabsRouter.delete(
  "/:tabId",
  validate({ params: tabIdParamsSchema }),
  deleteTab
);

// delete many tabs
tabsRouter.post(
  "/bulk-delete",
  validate({ body: deleteManyTabsSchema }),
  deleteManyTabs
);

//add items
tabsRouter.post(
  "/:tabId/items/",
  validate({ body: addItemsBodySchema, params: tabIdParamsSchema }),
  addItems
);

//remove one item
tabsRouter.delete(
  "/:tabId/items/:itemId",
  validate({ params: tabItemParamsSchema }),
  deleteItem
);

//remove multiple items
tabsRouter.post(
  "/:tabId/items/bulk-delete",
  validate({ body: deleteManyItemsSchema, params: tabIdParamsSchema }),
  deleteManyItems
);

//mark item as paid


//update item details

export default tabsRouter;

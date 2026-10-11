import Tab from "../models/tab.model.js";
import mongoose from "mongoose";
import { calculateTabTotalStorage } from "../pipelines/tab.pipelines.js";

export const addNewTab = async (tabs) => {
  if (!Array.isArray(tabs)) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    throw error;
  }
  const createdTabs = await Tab.create(tabs);
  return createdTabs;
};

export const updateTab = async (tabId, body) => {
  const updatedDocument = await Tab.findByIdAndUpdate(
    { _id: tabId },
    { ...body },
    { returnDocument: "after", runValidators: "true" }
  );
  return updatedDocument;
};

export const deactivateTab = async (tabId) => {
  const tabDeactivated = await Tab.findByIdAndUpdate(
    { _id: tabId },
    { tabActive: "false" },
    { returnDocument: "after", runValidators: "true" }
  );
  if (tabDeactivated) {
    return true;
  }
};

export const deleteTab = async (tabId) => {
  const deletedTab = await Tab.findByIdAndDelete(tabId);
  return deletedTab;
};

export const deleteManyTabs = async (tabIds) => {
  const [, count] = await Tab.findAndCount({ _id: { $in: tabIds } }, null, {
    sort: { _id: 1 },
    limit: 10,
  });
  console.log(count);
  console.log(tabIds.length);
  if (count !== tabIds.length) {
    const error = new Error("One or more tabs not found");
    error.statusCode = 404;
    throw error;
  }

  const { deletedCount } = await Tab.deleteMany({ _id: { $in: tabIds } });
  console.log(deletedCount);
  return deletedCount;
};

export const addItems = async (tabId, items) => {
  const session = await mongoose.startSession();

  try {
    const updatedTab = await session.withTransaction(
      async () => {
        const tab = await Tab.findById(tabId).session(session);

        if (!tab) {
          const error = new Error("Tab not found");
          error.statusCode = 404;
          throw error;
        }

        const updatedTab = await Tab.findByIdAndUpdate(
          tabId,
          [
            //stage 1: add item to items array
            {
              $set: {
                items: {
                  $concatArrays: [{ $ifNull: ["$items", []] }, items],
                },
              },
            },
            //stage 2: calculate tabTotal
            calculateTabTotalStorage,
          ],
          { returnDocument: "after", session, updatePipeline: true }
        );

        return updatedTab;
      },
      {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
      }
    );
    return updatedTab;
  } finally {
    await session.endSession();
  }
};

export const deleteItem = async (tabId, itemId) => {
  const updatedTab = await Tab.findOneAndUpdate(
    { _id: tabId, "items._id": itemId },
    { $pull: { items: { _id: itemId } } },
    { returnDocument: "after" }
  );

  if (updatedTab) {
    return updatedTab;
  }

  const tabExists = await Tab.exists({ _id: tabId });
  if (!tabExists) {
    const error = new Error("Tab not found");
    error.statusCode = 404;
    throw error;
  }

  const error = new Error("Item not found");
  error.statusCode = 404;
  throw error;
};

export const deleteManyItems = async (tabId, itemIds) => {
  const updatedTab = await Tab.findOneAndUpdate(
    { _id: tabId, "items._id": { $all: itemIds } },
    { $pull: { items: { _id: { $in: itemIds } } } },
    { returnDocument: "after" }
  );

  if (updatedTab) {
    return updatedTab;
  }

  const tabExists = await Tab.exists({ _id: tabId });
  const error = new Error(
    tabExists ? "One or more items not found" : "Tab not found"
  );
  error.statusCode = 404;
  throw error;
};

export const payItems = async (tabId, itemIds, datePaid) => {
  const updatedTab = await Tab.findOneAndUpdate(
    {
      _id: tabId,
      "items._id": { $all: itemIds },
    },
    {
      $set: {
        "items.$[item].itemPaid": true,
        "items.$[item].datePaid": datePaid,
      },
    },
    {
      arrayFilters: [
        {
          "item._id": { $in: itemIds },
          "item.itemPaid": { $ne: true },
        },
      ],
      returnDocument: "after",
    }
  );

  if (updatedTab) {
    return updatedTab;
  }

  const tabExists = await Tab.exists({ _id: tabId });

  const error = new Error(
    tabExists ? "one or more items not found" : "Tab not found"
  );
  error.statusCode = 404;
  throw error;
};

export const unpayItems = async (tabId, itemIds) => {
  const updatedTab = await Tab.findOneAndUpdate(
    {
      _id: tabId,
      "items._id": { $all: itemIds },
    },
    {
      $set: {
        "items.$[item].itemPaid": false,
      },
      $unset: { "items.$[item].datePaid": "" },
    },
    {
      arrayFilters: [
        {
          "item._id": { $in: itemIds },
          "item.itemPaid": { $ne: false },
        },
      ],
      returnDocument: "after",
    }
  );

  if (updatedTab) {
    return updatedTab;
  }

  const tabExists = await Tab.exists({ _id: tabId });

  const error = new Error(
    tabExists ? "one or more items not found" : "Tab not found"
  );
  error.statusCode = 404;
  throw error;
};

export const updateItem = async (tabId, itemId, body) => {
  const updateFields = {};
  for (const [key, value] of Object.entries(body)) {
    updateFields[`items.$.${key}`] = value;
  }
  console.log(updateFields);

  const updatedTab = await Tab.findOneAndUpdate(
    { _id: tabId, "items._id": itemId },
    { $set: updateFields },
    { returnDocument: "after" }
  );
  if (updatedTab) {
    const updatedItem = updatedTab.items.filter(
      (item) => item._id.toString() === itemId
    );
    return updatedItem;
  }
  const tabExists = Tab.exists({ _id: tabId });
  const error = new Error(tabExists ? "Item not found" : "Tab not found");
  error.statusCode = 404;
  throw error;
};

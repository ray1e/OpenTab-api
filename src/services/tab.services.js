import Tab from "../models/tab.model.js";

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
    { "tabActive": "false" },
    { returnDocument: "after", runValidators: "true" }
  );
  if (tabDeactivated) {
    return true;
  }
};

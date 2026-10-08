import {
  addNewTab as addNewTabService,
  updateTab as updateTabService,
  deactivateTab as deactivateTabService,
  deleteTab as deleteTabService,
  deleteManyTabs as deleteManyTabsService,
} from "../services/tab.services.js";

export const addNewTab = async (req, res, next) => {
  try {
    const { tabs } = req.body;

    const createdTabs = await addNewTabService(tabs);
    res.status(201).json({
      success: true,
      message: "Tab(s) created successfully",
      data: createdTabs,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTab = async (req, res, next) => {
  try {
    const body = req.body;
    const { tabId } = req.params;
    const updatedTab = await updateTabService(tabId, body);
    if (!updatedTab) {
      const error = new Error("Tab not found");
      error.statusCode = 404;
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: "Tab updated successfully",
        data: updatedTab,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deactivateTab = async (req, res, next) => {
  try {
    //const { tabStatus } = req.body;
    const { tabId } = req.params;

    const tabDeactivated = await deactivateTabService(tabId);
    if (!tabDeactivated) {
      const error = new Error("Tab not found");
      error.statusCode = 404;
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: "Tab deactivated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTab = async (req, res, next) => {
  try {
    const { tabId } = req.params;
    const deletedTab = await deleteTabService(tabId);
    if (!deletedTab) {
      const error = new Error("Tab not found");
      error.statusCode = 404;
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: "Tab deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteManyTabs = async (req, res, next) => {
  try {
    const { tabIds } = req.body;
    const deletedCount = await deleteManyTabsService(tabIds);
    res.status(200).json({
      success: true,
      message: "Tabs deleted successfully",
      data:  {deletedTabs: deletedCount} ,
    });
  } catch (error) {
    next(error);
  }
};

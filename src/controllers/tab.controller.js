import { addNewTab as addNewTabService, updateTab as updateTabService } from "../services/tab.services.js";

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

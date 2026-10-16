import {
  addNewTab as addNewTabService,
  updateTab as updateTabService,
  deactivateTab as deactivateTabService,
  deleteTab as deleteTabService,
  deleteManyTabs as deleteManyTabsService,
  addItems as addItemsService,
  deleteItem as deleteItemService,
  deleteManyItems as deleteManyItemsService,
  payItems as payItemsService,
  unpayItems as unpayItemsService,
  updateItem as updateItemService,
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

    res.status(200).json({
      success: true,
      message: "Tab updated successfully",
      data: updatedTab,
    });
  } catch (error) {
    next(error);
  }
};

export const deactivateTab = async (req, res, next) => {
  try {
    //const { tabStatus } = req.body;
    const { tabId } = req.params;

    await deactivateTabService(tabId);

    res.status(200).json({
      success: true,
      message: "Tab deactivated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTab = async (req, res, next) => {
  try {
    const { tabId } = req.params;
    await deleteTabService(tabId);

    res.status(200).json({
      success: true,
      message: "Tab deleted successfully",
    });
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
      data: { deletedTabs: deletedCount },
    });
  } catch (error) {
    next(error);
  }
};

export const addItems = async (req, res, next) => {
  try {
    const { items } = req.body;
    const { tabId } = req.params;
    const updatedTab = await addItemsService(tabId, items);

    res.status(200).json({
      success: true,
      message: "Items added successfully",
      data: updatedTab,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { tabId, itemId } = req.params;
    const updatedTab = await deleteItemService(tabId, itemId);

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: updatedTab,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteManyItems = async (req, res, next) => {
  try {
    const { itemIds } = req.body;
    const { tabId } = req.params;
    const newTab = await deleteManyItemsService(tabId, itemIds);
    res.status(200).json({
      success: true,
      message: "Items deleted successfully",
      data: newTab,
    });
  } catch (error) {
    next(error);
  }
};

export const payItems = async (req, res, next) => {
  try {
    const { itemIds, datePaid } = req.body;
    const { tabId } = req.params;
    const updatedTab = await payItemsService(tabId, itemIds, datePaid);
    res.status(200).json({
      success: true,
      message: "Item(s) marked as paid successfully",
      data: updatedTab,
    });
  } catch (error) {
    next(error);
  }
};

export const unpayItems = async (req, res, next) => {
  try {
    const { itemIds } = req.body;
    const { tabId } = req.params;
    const updatedTab = await unpayItemsService(tabId, itemIds);
    res.status(200).json({
      success: true,
      message: "Item(s) payment reversed succesfully",
      data: updatedTab,
    });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  const { tabId, itemId } = req.params;
  const body = req.body;
  try {
    const updatedItem = await updateItemService(tabId, itemId, body);
    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

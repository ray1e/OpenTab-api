import {
  addDebtor as addDebtorService,
  getOneDebtProfile as getOneDebtProfileService,
} from "../services/debtor.services.js";

export const addDebtor = async (req, res, next) => {
  try {
    const debtorData = req.body;
    const createdDebtProfile = await addDebtorService(debtorData);
    res.status(201).json({
      success: true,
      message: "Debt profile created successfully",
      data: createdDebtProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneDebtProfile = async (req, res, next) => {
  try {
    const { debtorId } = req.params;
    const debtProfile = await getOneDebtProfileService(debtorId);
    if (!debtProfile) {
      const error = new Error("Debt profile not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Debt profile retrieved successfully",
      data: debtProfile,
    });
  } catch (error) {
    next(error);
  }
};

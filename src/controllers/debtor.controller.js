import { addDebtor as addDebtorService } from "../services/debtor.services.js";
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

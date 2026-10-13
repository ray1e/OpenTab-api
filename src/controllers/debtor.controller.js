import {
  addDebtor as addDebtorService,
  getOneDebtProfile as getOneDebtProfileService,
  getAllDebtProfiles as getAllDebtProfilesService,
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
/* "data": {
        "debtorProfile": {
            "_id": "6acdcdba7787bbe05df7c6d3",
            "name": "simon",
            "createdAt": "2026-10-13T06:20:42.068Z",
            "updatedAt": "2026-10-13T06:20:42.068Z"
        },
        "tabs": [
            {
                "_id": "6acdcdba7787bbe05df7c6d4",
                "debtorId": "6acdcdba7787bbe05df7c6d3",
                "dateTaken": "2026-10-08T09:00:00.000Z",
                "tabTotal": 0,
                "tabPaid": false,
                "items": [
                    {
                        "itemName": "Coffee",
                        "itemPrice": 3.5,
                        "itemQuantity": 2,
                        "itemPaid": false,
                        "_id": "6acdcdba7787bbe05df7c6d5"
                    },
                    {
                        "itemName": "Sandwich",
                        "itemPrice": 8,
                        "itemQuantity": 1,
                        "itemPaid": false,
                        "_id": "6acdcdba7787bbe05df7c6d6"
                    }
                ],
                "createdAt": "2026-10-13T06:20:42.351Z",
                "updatedAt": "2026-10-13T06:20:42.351Z"
            }
        ]
    } */

export const getAllDebtProfiles = async (req, res, next) => {
  try {
    const query = res.locals.validatedQuery;
    const allDebtProfiles = await getAllDebtProfilesService(query);
    if (!allDebtProfiles) {
      const error = new Error("Debt profiles not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Debt profiles retrieved successfully",
      data: allDebtProfiles,
    });
  } catch (error) {
    next(error);
  }
};

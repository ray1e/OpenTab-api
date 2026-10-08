import mongoose from "mongoose";
import Debtor from "../models/debtor.model.js";
import Tab from "../models/tab.model.js";

export const addDebtor = async (debtorData) => {
  const { name, dateTaken, items } = debtorData;

  // create session, return an instance of ClientSession which on the mongodb server,
  // tracks all operations under this session as a single transaction
  const session = await mongoose.startSession();

  const transactionOptions = {
    ReadPreference: "primary",
    ReadConcern: { level: "local" },
    WriteConcern: { w: "majority" },
  };

  try {
    //start a transaction
    const transactionResults = await session.withTransaction(async () => {
      // add debtor profile i.e name to Debtors collection
      const [debtorProfile] = await Debtor.create([{ name }], { session });
      console.log(`debtorProfile is ${debtorProfile}`);

      if (!debtorProfile) {
        await session.abortTransaction();
        const error = new Error("Debtor profile creation failed");
        error.statusCode = 500;
        throw error;
      }

      // add debts to tabs collection
      const [tabs] = await Tab.create(
        [
          {
            dateTaken,
            items,
            debtorId: debtorProfile._id,
          },
        ],
        { session }
      );
      const createdProfileAndTab = { debtor: debtorProfile, tabs };
      console.log(createdProfileAndTab);
      return createdProfileAndTab;
    }, transactionOptions);
    return transactionResults;
  } finally {
    await session.endSession();
  }
};

export const getOneDebtProfile = async (debtorId) => {
  const session = await mongoose.startSession();

  const transactionOptions = {
    ReadPreference: "primary",
    ReadConcern: { level: "local" },
    WriteConcern: { w: "majority" },
  };

  try {
    const transactionResults = await session.withTransaction(async () => {
      const debtorProfile = await Debtor.findById(debtorId)
        .session(session)
        .select("-__v")
        .lean();
      if (!debtorProfile) {
        await session.abortTransaction();
        const error = new Error("Debtor profile not found");
        error.statusCode = 404;
        throw error;
      }

      const tabs = await Tab.find({ debtorId })
        .select("-__v")
        .lean()
        .session(session);
      return { debtorProfile, tabs };
    }, transactionOptions);
    return transactionResults;
  } finally {
    await session.endSession();
  }
};

export const getAllDebtProfiles = async (query) => {
  const { include } = query;
  const allDebtors = await Debtor.find().select("-__v").lean();

  const queryResults =
    include === "tabs"
      ? await Debtor.aggregate([
          {
            $lookup: {
              from: "tabs",
              localField: "_id",
              foreignField: "debtorId",
              as: "tabs",
            },
          },
          {
            $project: {
              __v: 0,
              "tabs.__v": 0,
            },
          },
        ])
      : allDebtors;

  return queryResults;
};

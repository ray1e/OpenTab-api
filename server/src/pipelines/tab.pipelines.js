export const calculateTabTotalStorage = Object.freeze({
  $set: {
    tabTotal: {
      $sum: {
        $map: {
          input: "$items",
          as: "item",
          in: {
            $multiply: [
              { $ifNull: ["$$item.itemPrice", 0] },
              { $ifNull: ["$$item.itemQuantity", 1] },
            ],
          },
        },
      },
    },
  },
});

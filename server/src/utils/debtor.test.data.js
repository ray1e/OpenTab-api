export const reqAddDebtor = {
  name: "simon",
  dateTaken: "2026-10-08T09:00:00.000Z",
  items: [
    {
      itemName: "Coffee",
      itemPrice: 3.5,
      itemQuantity: 2,
      itemActive: true,
    },
    {
      itemName: "Sandwich",
      itemPrice: 8,
      itemQuantity: 1,
    },
  ],
};

export const resAddDebtor = {
  success: true,
  message: "Debt profile created successfully",
  data: {
    debtor: {
      name: "simon",
    },
    tabs: {
      dateTaken: "2026-10-08T09:00:00.000Z",
      tabTotal: 0,
      tabPaid: false,
      items: [
        {
          itemName: "Coffee",
          itemPrice: 3.5,
          itemQuantity: 2,
        },
        {
          itemName: "Sandwich",
          itemPrice: 8,
          itemQuantity: 1,
        },
      ],
    },
  },
};

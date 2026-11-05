export const reqAddTabs = {
  tabs: [
    {
      debtorId: "67f8a1b2c3d4e5f678901234",
      dateTaken: new Date().toISOString(),
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
    {
      debtorId: "67f8a1b2c3d4e5f678901234",
      dateTaken: new Date().toISOString(),
      items: [
        {
          itemName: "Tea",
          itemPrice: 2.5,
          itemQuantity: 1,
        },
      ],
    },
  ],
};

export const invalidReqAddTabs = {
  tabs: [
    {
      debtorId: "67f8a1b2c3d4e5f678901234",
      dateTaken: new Date().toISOString(),
      items: [
        {
          itemName: "Coffee",
          itemPrice: "once", // invalid itemPrice type
          itemQuantity: 2,
        },
        {
          itemName: "Sandwich",
          itemPrice: 8,
          itemQuantity: 1,
        },
      ],
    },
    {
      debtorId: "67f8a1b2c3d4e5f678901234",
      dateTaken: new Date().toISOString(),
      items: [
        {
          itemName: "Tea",
          itemPrice: 2.5,
          itemQuantity: 1,
        },
      ],
    },
  ],
};

export const reqUpdateTab = {
  tabPaid: true,
};

export const reqCreateItems = {
  items: [
    {
      itemName: "Latte",
      itemPrice: 4.5,
      itemQuantity: 1,
    },
    {
      itemName: "Muffin",
      itemPrice: 2.5,
      itemQuantity: 2,
    },
  ],
};

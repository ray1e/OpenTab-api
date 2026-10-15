import request from "supertest";
import app from "../../app.js";
import {
  reqAddTabs,
  invalidReqAddTabs,
  reqUpdateTab,
  reqCreateItems,
} from "../../utils/tab.test.data.js";
import { reqAddDebtor } from "../../utils/debtor.test.data.js";

describe("tab controller", () => {
  describe("create tab", () => {
    it("return 201 and created tab", async () => {
      const res = await request(app)
        .post("/api/v1/tabs")
        .send(reqAddTabs)
        .set("Content-Type", "application/json");

      const tab = res.body.data[0];

      expect(tab).toHaveProperty("debtorId");
      expect(tab).toHaveProperty("dateTaken");
      expect(tab).toHaveProperty("tabTotal");
      expect(tab).toHaveProperty("tabPaid");
      expect(tab).toHaveProperty("items");
      expect(tab.items[0]).toHaveProperty("itemName");
      expect(tab.items[0]).toHaveProperty("itemPrice");
      expect(tab.items[0]).toHaveProperty("itemQuantity");
      expect(tab.items[0]).toHaveProperty("itemPaid");
      expect(tab.items[0]).toHaveProperty("_id");
    });

    it("return 400 when tab has invalid data", async () => {
      const res = await request(app)
        .post("/api/v1/tabs")
        .send(invalidReqAddTabs)
        .set("Content-Type", "application/json");

      expect(res.status).toBe(400);
    });
  });

  describe("mark tab as paid", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send(reqAddDebtor)
        .set("Content-Type", "application/json");
    });

    it("returns 200", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app).patch(`/api/v1/tabs/${tabId}/pay`);
      expect(res.status).toBe(200);
    });
  });

  describe("update a tab", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send(reqAddDebtor)
        .set("Content-Type", "application/json");
    });

    it("return 200 and the updated tab", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app)
        .patch(`/api/v1/tabs/${tabId}`)
        .send(reqUpdateTab);
      expect(res.status).toBe(200);
      expect(res.body.data.tabPaid).toBeTruthy();
      expect(res.body.data).toEqual(
        expect.objectContaining({
          _id: tabId,
          tabPaid: true,
        })
      );
    });

    it("return 400 when invalid data type in body is sent", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app)
        .patch(`/api/v1/tabs/${tabId}`)
        .send({ dateTaken: "today" });
      expect(res.status).toBe(400);
    });

    it("return 400 when trying to overwrite immutable attributes", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app)
        .patch(`/api/v1/tabs/${tabId}`)
        .send({ _id: "6acb6912404927495ab19e11" });
      expect(res.status).toBe(400);
    });
  });

  describe("delete a tab", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send(reqAddDebtor)
        .set("Content-Type", "application/json");
    });

    it(" deletes the tab returns 200 and", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app).delete(`/api/v1/tabs/${tabId}`);

      expect(res.status).toBe(200);
    });
  });

  describe("bulk delete tabs", () => {
    /* beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/tabs")
        .send(reqAddTabs)
        .set("Content-Type", "application/json");
    }); */
    it("returns 200, number of deleted tabs and deletes the tabs", async () => {
      let createdTabIds = [];
      const createdTabs = await request(app)
        .post("/api/v1/tabs")
        .send(reqAddTabs)
        .set("Content-Type", "application/json");

      createdTabIds = createdTabs.body.data.map((tab) => tab._id.toString());
      const res = await request(app)
        .post("/api/v1/tabs/bulk-delete")
        .send({ tabIds: createdTabIds })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          data: {
            deletedTabs: createdTabIds.length,
          },
        })
      );
    });

    it("returns 400 when tabIds array is empty", async () => {
      const res = await request(app)
        .post("/api/v1/tabs/bulk-delete")
        .send({ tabIds: [] })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(400);
    });

    it("returns 404 when a tabId does not exist", async () => {
      const res = await request(app)
        .post("/api/v1/tabs/bulk-delete")
        .send({ tabIds: ["68edc8ec7e5d4a2f9b31c670"] })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(404);
    });
  });

  describe("add items to tab", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send(reqAddDebtor)
        .set("Content-Type", "application/json");
    });

    it("returns 200 and updated tab with the added items", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app)
        .post(`/api/v1/tabs/${tabId}/items`)
        .send(reqCreateItems);

      expect(res.status).toBe(200);
      // index 2 here is used because reqAddDebtor in the  beforeEach block adds 2 items to the tab
      expect(res.body.data.items[2]).toEqual(
        expect.objectContaining({
          itemName: "Latte",
          itemPrice: 4.5,
          itemQuantity: 1,
        })
      );
    });

    it("returns 400 when invalid type in items is used", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app)
        .post(`/api/v1/tabs/${tabId}/items`)
        .send({
          items: [
            {
              itemName: "Latte",
              itemPrice: "length()", //invalid type
              itemQuantity: 1,
            },
          ],
        });
      expect(res.status).toBe(400);
    });

    it("returns 404 when tabId does not exist", async () => {
      const tabId = "68edc8ec7e5d4a2f9b31c670"; //valid but does not exist
      const res = await request(app)
        .post(`/api/v1/tabs/${tabId}/items`)
        .send(reqCreateItems);
      expect(res.status).toBe(404);
    });

    it("returns 400 when tabId does not exist", async () => {
      const tabId = "6tedc8ec7e5d472f9b31c67p"; //invalid id
      const res = await request(app)
        .post(`/api/v1/tabs/${tabId}/items`)
        .send(reqCreateItems);
      expect(res.status).toBe(400);
    });
  });

  describe("delete item", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send(reqAddDebtor)
        .set("Content-Type", "application/json");
    });

    it("deletes item return 200 and", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const itemId =
        fullResponse.body.data.queryResults[0].tabs[0].items[0]._id;
      const res = await request(app).delete(
        `/api/v1/tabs/${tabId}/items/${itemId}`
      );

      const afterDeleteResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const deletedItemId =
        afterDeleteResponse.body.data.queryResults[0].tabs[0].items[0]._id;

      expect(deletedItemId).not.toBe(itemId);
      expect(res.status).toBe(200);
    });

    it("return 404 when tabId does not exist", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = "6ac9ed61f2ab2bb482490437";
      const itemId =
        fullResponse.body.data.queryResults[0].tabs[0].items[0]._id;
      console.log(tabId);
      console.log(itemId)
      const res = await request(app).delete(
        `/api/v1/tabs/${tabId}/items/${itemId}`
      );

      expect(res.status).toBe(404);
    });

    it("return 404 when itemId does not exist", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const itemId = "68edc8ec7e5d4a2f9b31c670";
      const res = await request(app).delete(
        `/api/v1/tabs/${tabId}/items/${itemId}`
      );

      expect(res.status).toBe(404);
    });

    it("return 400 when tabId is invalid", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = "68edc8ec7e5d4a2f9b3132670";
      const itemId =
        fullResponse.body.data.queryResults[0].tabs[0].items[0]._id;
      const res = await request(app).delete(
        `/api/v1/tabs/${tabId}/items/${itemId}`
      );

      expect(res.status).toBe(400);
    });

    it("return 400 when itemId is invalid", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data.queryResults[0].tabs[0]._id;
      const itemId = "68edc8ec7e5d4a2f9b31c6703";
      const res = await request(app).delete(
        `/api/v1/tabs/${tabId}/items/${itemId}`
      );

      expect(res.status).toBe(400);
    });
  });

  describe("delete many items", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send(reqAddDebtor)
        .set("Content-Type", "application/json");
    });

    it("returns 400 when itemIds array is empty", async () => {
      const fullDebtProfile = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullDebtProfile.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app)
        .post(`/api/v1/tabs/${tabId}/items/bulk-delete`)
        .send({ itemIds: [] });

      expect(res.status).toBe(400);
    });

    it("returns 404 when an itemId does not exist", async () => {
      const fullDebtProfile = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullDebtProfile.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app)
        .post(`/api/v1/tabs/${tabId}/items/bulk-delete`)
        .send({ itemIds: ["68edc8ec7e5d4a2f9b31c670"] });

      expect(res.status).toBe(404);
    });

    it("returns 400 when an itemId is invalid", async () => {
      const fullDebtProfile = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullDebtProfile.body.data.queryResults[0].tabs[0]._id;
      const res = await request(app)
        .post(`/api/v1/tabs/${tabId}/items/bulk-delete`)
        .send({ itemIds: ["invalid-item-id"] });

      expect(res.status).toBe(400);
    });

    it("returns 404 when tabId does not exist", async () => {
      const res = await request(app)
        .post("/api/v1/tabs/68edc8ec7e5d4a2f9b31c670/items/bulk-delete")
        .send({ itemIds: ["68edc8ec7e5d4a2f9b31c670"] });

      expect(res.status).toBe(404);
    });

    it("returns 400 when tabId is invalid", async () => {
      const res = await request(app)
        .post("/api/v1/tabs/invalid-tab-id/items/bulk-delete")
        .send({ itemIds: ["68edc8ec7e5d4a2f9b31c670"] });

      expect(res.status).toBe(400);
    });

    it("returns 200 and deletes the items", async () => {
      const fullDebtProfile = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullDebtProfile.body.data.queryResults[0].tabs[0]._id;
      const itemIds =
        fullDebtProfile.body.data.queryResults[0].tabs[0].items.map((item) =>
          item._id.toString()
        );

      const res = await request(app)
        .post(`/api/v1/tabs/${tabId}/items/bulk-delete`)
        .send({ itemIds: itemIds });

      expect(res.status).toBe(200);
    });
  });
});

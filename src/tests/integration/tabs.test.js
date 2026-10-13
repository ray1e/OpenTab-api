import request from "supertest";
import app from "../../app.js";
import {
  reqAddTabs,
  invalidReqAddTabs,
  reqUpdateTab,
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
      const tabId = fullResponse.body.data[0].tabs[0]._id;
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
      const tabId = fullResponse.body.data[0].tabs[0]._id;
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
      const tabId = fullResponse.body.data[0].tabs[0]._id;
      const res = await request(app)
        .patch(`/api/v1/tabs/${tabId}`)
        .send({ dateTaken: "today" });
      expect(res.status).toBe(400);
    });

    it("return 400 when trying to overwrite immutable attributes", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data[0].tabs[0]._id;
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

    it("returns 200 and deletes the tab", async () => {
      const fullResponse = await request(app).get(
        "/api/v1/debtors?include=tabs"
      );
      const tabId = fullResponse.body.data[0].tabs[0]._id;
      const res = await request(app).delete(`/api/v1/tabs/${tabId}`);

      expect(res.status).toBe(200);
    });
  });
});

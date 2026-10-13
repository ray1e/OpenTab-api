import request from "supertest";
import app from "../../app.js";
import { reqAddDebtor, resAddDebtor } from "../../utils/debtor.test.data.js";

describe("debtor controller", () => {
  describe("create debtor", () => {
    it("returns 201 and created debt profile", async () => {
      const res = await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send(reqAddDebtor)
        .set("Content-Type", "application/json");
      //console.dir({ status: res.status, body: res.body }, { depth: null });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(resAddDebtor);
    });
  });

  describe("get all debt profiles", () => {
    beforeEach(
      async () =>
        await request(app)
          .post("/api/v1/debtors")
          .set("Connection", "close")
          .send(reqAddDebtor)
          .set("Content-Type", "application/json")
    );

    it("returns 200 and debtors when no query is provided", async () => {
      const res = await request(app).get("/api/v1/debtors");
      const debtor = res.body.data[0];
      expect(res.status).toBe(200);
      expect(debtor).toHaveProperty("_id");
      expect(debtor).toHaveProperty("name");
    });

    it("returns 200 and all debt profiles when include=tabs query is provided", async () => {
      const res = await request(app).get("/api/v1/debtors?include=tabs");
      const debtor = res.body.data[0];
      expect(res.status).toBe(200);
      expect(debtor).toHaveProperty("_id");
      expect(debtor).toHaveProperty("name");
      expect(debtor.tabs[0]).toHaveProperty("debtorId");
      expect(debtor.tabs[0]).toHaveProperty("dateTaken");
      expect(debtor.tabs[0]).toHaveProperty("tabTotal");
      expect(debtor.tabs[0]).toHaveProperty("tabPaid");
      expect(debtor.tabs[0]).toHaveProperty("items");
      expect(debtor.tabs[0].items[0]).toHaveProperty("itemName");
      expect(debtor.tabs[0].items[0]).toHaveProperty("itemPrice");
      expect(debtor.tabs[0].items[0]).toHaveProperty("itemQuantity");
      expect(debtor.tabs[0].items[0]).toHaveProperty("itemPaid");
      expect(debtor.tabs[0].items[0]).toHaveProperty("_id");
    });

    it("returns 400 when unknown query parameters are passed", async () => {
      const res = await request(app).get("/api/v1/debtors?includesss=tabs");

      expect(res.status).toBe(400);
    });

    it("returns 400 when unknown include values are passed", async () => {
      const res = await request(app).get("/api/v1/debtors?include=tabsss");

      expect(res.status).toBe(400);
    });
  });

  describe("get one debt profile", () => {
    beforeEach(
      async () =>
        await request(app)
          .post("/api/v1/debtors")
          .set("Connection", "close")
          .send(reqAddDebtor)
          .set("Content-Type", "application/json")
    );
    it("returns 200 and a debt profile", async () => {
      const getRes = await request(app).get("/api/v1/debtors");
      const debtorId = getRes.body.data[0]._id;
      const res = await request(app).get(
        `/api/v1/debtors/${debtorId}/debt-profile`
      );
      const debtorProfile = res.body.data;

      expect(res.status).toBe(200);
      expect(debtorProfile).toHaveProperty("debtorProfile");
      expect(debtorProfile).toHaveProperty("tabs");
    });

    it("returns 400 when invalid debtorId is used", async () => {
      const debtorId = "67kdcdb67787bbe05df7c643";
      const res = await request(app).get(
        `/api/v1/debtors/${debtorId}/debt-profile`
      );
      expect(res.status).toBe(400);
    });
  });
});

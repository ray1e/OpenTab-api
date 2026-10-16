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
      const debtor = res.body.data.queryResults[0];
      expect(res.status).toBe(200);
      expect(debtor).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
        })
      );
    });

    it("returns 200 and all debt profiles when include=tabs query is provided", async () => {
      const res = await request(app).get("/api/v1/debtors?include=tabs");
      const debtor = res.body.data.queryResults[0];
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          queryResults: expect.any(Array),
          hasNextPage: expect.any(Boolean),
        })
      );
      expect(debtor).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          tabs: expect.arrayContaining([
            expect.objectContaining({
              debtorId: expect.any(String),
              dateTaken: expect.any(String),
              tabTotal: expect.any(Number),
              tabPaid: expect.any(Boolean),
              items: expect.arrayContaining([
                expect.objectContaining({
                  itemName: expect.any(String),
                  itemPrice: expect.any(Number),
                  itemQuantity: expect.any(Number),
                  itemPaid: expect.any(Boolean),
                  _id: expect.any(String),
                }),
              ]),
            }),
          ]),
        })
      );
    });

    it("returns 400 when unknown query parameters are passed", async () => {
      const res = await request(app).get("/api/v1/debtors?includesss=tabs");

      expect(res.status).toBe(400);
    });

    it("returns 400 when unknown include values are passed", async () => {
      const res = await request(app).get("/api/v1/debtors?include=tabsss");

      expect(res.status).toBe(400);
    });

    it("returns debts in descending order based on a debtor's most recently added tab", async () => {
      await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send({
          name: "Mark",
          dateTaken: "2026-10-16T09:00:00.000Z",
          items: [
            {
              itemName: "matchbox",
              itemPrice: 3.5,
              itemQuantity: 2,
              itemActive: true,
            },
            {
              itemName: "pencil",
              itemPrice: 8,
              itemQuantity: 1,
            },
          ],
        })
        .set("Content-Type", "application/json");

      await request(app)
        .post("/api/v1/debtors")
        .set("Connection", "close")
        .send({
          name: "Luke",
          dateTaken: "2026-08-16T09:00:00.000Z",
          items: [
            {
              itemName: "watch",
              itemPrice: 3.5,
              itemQuantity: 2,
              itemActive: true,
            },
            {
              itemName: "cpu",
              itemPrice: 8,
              itemQuantity: 1,
            },
          ],
        })
        .set("Content-Type", "application/json");
      const res = await request(app).get("/api/v1/debtors?include=tabs");
      const debtProfiles = res.body.data.queryResults; 
      const dateTakenArray = debtProfiles.map((profile) => {
        // map inside a tab and return an array of dateTaken dates and returns max date
        const maxTabDatesArray = profile.tabs.map((tab) => {
          return Date.parse(tab.dateTaken);
        });
        return Math.max(...maxTabDatesArray);
      });
      const isDateSorted = dateTakenArray.every(
        (date, index) => index === 0 || dateTakenArray[index - 1] >= date
      );

      expect(isDateSorted).toBeTruthy();
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
      const debtorId = getRes.body.data.queryResults[0]._id;
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

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
      console.dir({ status: res.status, body: res.body }, { depth: null });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(resAddDebtor);
    });
  });
});

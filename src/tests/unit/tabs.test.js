import request from "supertest";
import app from "../../app.js";

describe("GET /api/v1/health", () => {
  it("returns the API health status", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "API is running",
      status: "OK",
      version: "1.0.0",
    });
  });
});

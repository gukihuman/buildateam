import app from "../express"
import request from "supertest"

describe("API Endpoints", () => {
    it("GET /api/products - success", async () => {
        const res = await request(app).get("/api/products")
        expect(res.statusCode).toEqual(200)
        expect(res.body[0]).toHaveProperty("bodyHtml")
    })
})

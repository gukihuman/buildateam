import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = 5050

fetchShopifyData().then((data) => {
    console.log(data)

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    // Serve client static files
    app.use(express.static(path.join(__dirname, "client/build")))
    app.get("*", (req, res) => {
        console.log(req)
        res.sendFile(path.join(__dirname, "client/build/index.html"))
    })

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})

async function fetchShopifyData() {
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN
    const storeName = process.env.SHOPIFY_STORE_NAME

    const graphqlURL = `https://${storeName}/admin/api/2024-01/graphql.json`
    const query = `{
        products (first: 3) {
            edges {
                node {
                    id
                    bodyHtml
                }
            }
        }
    }`

    try {
        const response = await fetch(graphqlURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": accessToken,
            },
            body: JSON.stringify({ query }),
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching data from Shopify:", error)
    }
}

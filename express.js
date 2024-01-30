import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5050

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Serve client static files
app.use(express.static(path.join(__dirname, "client/build")))

// API endpoint to get Shopify products
app.get("/api/products", (req, res) => {
    console.log("Fetching Shopify products...")
    res.json(shopifyProducts)
})

// Fallback for serving the client app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Server running on http://localhost:${PORT}`)
    }
})

let shopifyProducts = [] // Temporary storage for fetched Shopify data

async function fetchShopifyData() {
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN
    const storeName = process.env.SHOPIFY_STORE_NAME

    const graphqlURL = `https://${storeName}/admin/api/2023-10/graphql.json`
    const query = `{
        products(first: 3) {
            edges {
                node {
                    id
                    bodyHtml
                    images(first: 1) {
                        nodes {
                            src
                        }
                    }
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

        const { data } = await response.json()

        // Restucture data to be more convenient for our app
        shopifyProducts = data.products.edges.map((edge) => {
            const product = edge.node
            product.imageSrc = product.images.nodes[0].src
            delete product.images
            return product
        })

        console.log(
            "Shopify data fetched, stored, and ready to serve on /api/products endpoint."
        )
    } catch (error) {
        console.error("Error fetching data from Shopify:", error)
    }
}

// Initiate fetch on server start
fetchShopifyData()

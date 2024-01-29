import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const app = express()
const PORT = process.env.PORT || 5050

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")))

// Handle requests
app.get("*", (req, res) => {
    console.log(req)
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

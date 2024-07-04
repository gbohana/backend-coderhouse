const express = require("express")
const ProductManager = require("./ProductManager")

const app = express()

const prodManager = new ProductManager()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" })
})

app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query

        const products = await prodManager.getProducts(limit)
      
        res.status(200).json({ products })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params

        const product = await prodManager.getProductById(pid)
        
        res.status(200).json({ product })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = app

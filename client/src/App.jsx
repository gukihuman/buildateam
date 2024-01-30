import React, { useEffect, useRef } from "react"
import { useQuery } from "react-query"

function fetchProducts() {
    return fetch("/api/products").then((res) => res.json())
}

function App() {
    const { data, error, isLoading } = useQuery("products", fetchProducts)
    console.log(data)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
            }}
        >
            {data.map((product) => (
                <div key={product.id}>
                    <ProductCanvas imageSrc={product.imageSrc} />
                    <div
                        dangerouslySetInnerHTML={{ __html: product.bodyHtml }}
                    />
                </div>
            ))}
        </div>
    )
}

const ProductCanvas = ({ imageSrc }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        const image = new Image()
        image.src = imageSrc
        image.onload = () => {
            canvas.width = image.width
            canvas.height = image.height
            context.drawImage(image, 0, 0)
        }
    }, [imageSrc])

    return <canvas ref={canvasRef} />
}

export default App

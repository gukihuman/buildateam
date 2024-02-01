import React, { useEffect, useRef } from "react"
import DOMPurify from "dompurify"

const ProductCanvas = ({ imageSrc }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const image = new Image()

        image.src = imageSrc
        image.onload = () => {
            const maxSize = Math.max(image.width, image.height)

            // Set square canvas based on the largest dimension of the image
            canvas.width = maxSize
            canvas.height = maxSize

            // Calculate scaling factor to make the image cover the canvas
            const scale = Math.min(
                canvas.width / image.width,
                canvas.height / image.height
            )
            const x = canvas.width / 2 - (image.width / 2) * scale
            const y = canvas.height / 2 - (image.height / 2) * scale

            ctx.drawImage(
                image,
                x,
                y,
                image.width * scale,
                image.height * scale
            )
        }
    }, [imageSrc])

    return (
        <div className="mb-4">
            <canvas
                ref={canvasRef}
                className="w-full h-auto bg-white rounded-xl md:m-0 p-4"
            />
        </div>
    )
}

const extractProductDetails = (html) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")

    // Extract images based on labels
    const images = Array.from(doc.querySelectorAll("strong"))
        .filter((strong) => strong.textContent.toLowerCase().includes("view"))
        .map((strong) => ({
            label: strong.textContent.trim(),
            url: strong.nextElementSibling.textContent.trim(),
        }))

    const details = {}
    const detailElements = doc.querySelectorAll("p > strong")
    const whatToSkip = [
        "base_price",
        "is_calculated",
        "view",
        "_image",
        "rmbg123",
        "sku",
        "cables",
        "producturl",
        "configid",
    ]
    detailElements.forEach((element) => {
        const key = element.textContent.trim()
        const value = element.nextSibling.textContent.trim()

        // Skip some info
        for (let i = 0; i < whatToSkip.length; i++) {
            if (key.toLowerCase().includes(whatToSkip[i])) return
        }
        details[key] = value
    })

    return { images, details }
}

const ProductDetails = ({ bodyHtml }) => {
    const cleanedHtml = DOMPurify.sanitize(bodyHtml)
    const { images, details } = extractProductDetails(cleanedHtml)

    // Show only the second image since the first is empty
    return (
        <div>
            <p className="text-lg font-bold mb-1">Product Details:</p>
            <div>
                {Object.entries(details).map(([label, value], index) => (
                    <p key={index}>
                        <strong>{label}:</strong> {value}
                    </p>
                ))}
            </div>
            <p>
                <strong>{images[1].label}</strong>
            </p>
            <img
                src={images[1].url}
                alt="Product View"
                style={{ maxWidth: "200px" }}
            />
        </div>
    )
}

export const Product = ({ product }) => {
    return (
        <div key={product.id} className="p-4 max-w-[500px]">
            <ProductCanvas imageSrc={product.imageSrc} />
            <ProductDetails bodyHtml={product.bodyHtml} />
        </div>
    )
}

import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
} from "./redux/actions"
import { Product } from "./components/Product"

export default function App() {
    const dispatch = useDispatch()
    useQuery(
        "products",
        async () => {
            try {
                dispatch(fetchProductsRequest())
                const data = await fetch("/api/products").then((res) =>
                    res.json()
                )
                dispatch(fetchProductsSuccess(data))
            } catch (error) {
                dispatch(fetchProductsFailure(error.toString()))
            }
        },
        { staleTime: 30000 }
    )
    const products = useSelector((state) => state.products)
    const isLoading = useSelector((state) => state.isLoading)
    const error = useSelector((state) => state.error)

    if (isLoading)
        return (
            <div className="flex justify-center mt-2">
                <p className="text-lg">Loading...</p>
            </div>
        )
    if (error) return <div>An error occurred: {error.message}</div>

    return (
        <div className=" bg-slate-200 flex justify-center">
            <div className="max-w-[1200px] md:grid md:grid-cols-3 overflow-hidden">
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

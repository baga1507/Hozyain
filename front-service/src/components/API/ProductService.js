import axios from "axios"

export class ProductService {
    static async getProducts(filter) {
        let response = await axios.get("http://localhost:9000/market/products/all", {
            params: {
                ...filter
            }
        })
        return response
    }

    static async getImage(id) {
        const response = await axios.get("http://localhost:9000/market/products/image", {
            params: {
                id
            },
            responseType: "blob"
        })
        return response.data
    }

    static async createProduct(image, title, price) {
        const response = await axios.post("http://localhost:9000/market/products/create", image, {
            params: {
                title,
                price
            }
        })
        return response.data
    }
}

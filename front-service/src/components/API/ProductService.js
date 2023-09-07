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
}

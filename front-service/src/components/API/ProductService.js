import axios from "axios"

export class PostService {
    static async getProducts(filter) {
        let response = await axios.get("http://localhost:8189/core/products/all", {
            params: {
                ...filter
            }
        })
        return response
    }
}

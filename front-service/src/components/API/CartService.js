import axios from "axios";

export class CartService {
    static async add(product_id) {
        await axios.post("http://localhost:9000/market/carts/add", null, {
            params: {
                product_id,
            }
        })
        console.log("Все ок!")
    }

    static async remove(item_id) {
        await axios.post("http://localhost:9000/market/carts/remove", null, {
            params: {
                item_id
            }
        })
    }

    static async get() {
        const response = await axios.get("http://localhost:9000/market/carts/get")
        return response.data
    }

    static async clear() {
        await axios.post("http://localhost:9000/market/carts/clear")
    }
}
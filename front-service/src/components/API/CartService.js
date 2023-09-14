import axios from "axios";

export class CartService {
    static async add(product_id) {
        await axios.post("http://localhost:9000/market/carts/add", null, {
            params: {
                product_id,
                email: localStorage.getItem("email")
            }
        })
        console.log("Все ок!")
    }

    static async get() {
        const response = await axios.get("http://localhost:9000/market/carts/get", {
            params: {
                email: localStorage.getItem("email")
            }
        })
        return response.data
    }
}
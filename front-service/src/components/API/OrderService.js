import axios from "axios";

export class OrderService {
    static async create() {
        await axios.post("http://localhost:9000/market/orders/create", null, {
            params: {
                email: localStorage.getItem("email")
            }
        })
    }

    static async get(id) {
        return await axios.get("http://localhost:9000/market/orders/get", {
            params: {
                id
            }
        })
    }

    static async getUserOrders() {
        return await axios.get("http://localhost:9000/market/orders/get/all", {
            params: {
                email: localStorage.getItem("email")
            }
        })
    }
}
import axios from "axios";

export class OrderService {
    static async create() {
        await axios.post("http://localhost:9000/market/orders/create", null, {
            params: {
                email: localStorage.getItem("email")
            }
        })
    }
}
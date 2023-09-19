import axios from "axios";

export class AuthorizationService {
    static async authenticate(email, password) {
        const response = await axios.post("http://localhost:9000/market/auth/authenticate", {email, password}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    }

    static async register(email, password) {
        const response = await axios.post("http://localhost:9000/market/auth/register", {email, password}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data
    }
}
import axios from "axios";

export class AuthorizationService {
    static async authenticate(email, password) {
        const response = await axios.post("http://localhost:9000/market/auth", {email, password}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await response.data
    }
}
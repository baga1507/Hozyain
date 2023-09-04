import axios from "axios";

export class AuthorizationService {
    static async authenticate(email, password) {
        let response = axios.post("http://localhost:8190/auth/auth", {
            params: {
                email,
                password
            }
        })
        return response
    }
}
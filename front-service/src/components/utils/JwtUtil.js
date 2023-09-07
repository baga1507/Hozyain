export class JwtUtil {
    static getExpiration(token) {
        let jwt = JSON.parse(atob(token.split('.')[1]))
        return jwt.exp * 1000
    }

    static isExpired(token) {
        return Date.now() > this.getExpiration(token)
    }

    static isValid(token) {
        return !this.isExpired(token)
    }
}
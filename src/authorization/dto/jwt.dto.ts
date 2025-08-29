export class JwtPayload {
    id: number;
    role: string;
    email: string;
    name: string;
    age: number;
    iat: number = Math.floor((Date.now()) / 1000);
    exp: number;

    constructor(data: {
        id: number,
        role: string,
        email: string,
        name: string,
        age: number
    }, expiresInSecond: number) {
        this.id = data.id;
        this.role = data.role;
        this.email = data.email;
        this.name = data.name;
        this.age = data.age;
        this.exp = this.iat + expiresInSecond;
    }

    public getPayload() {
        return {
            id: this.id,
            role: this.role,
            email: this.email,
            name: this.name,
            age: this.age,
            iat: this.iat,
            exp: this.exp
        };
    }
}
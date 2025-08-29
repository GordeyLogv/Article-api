export class AuthLoginResDto {
    email: string;
    token: string;

    constructor(data: { email: string, token: string }) {
        this.email = data.email;
        this.token = data.token;
    }
}
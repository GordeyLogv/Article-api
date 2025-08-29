export class AuthRegisterResDto {    
    email: string;
    name: string;

    constructor(data: { email: string, name: string }) {
        this.email = data.email;
        this.name = data.name;
    }
}
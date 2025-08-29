import { UserRoles } from "../common/auth.roles.js";
import { compare, hash } from "bcryptjs";

export class User {
    private _email: string;
    private _password: string;
    private _role: UserRoles = UserRoles.USER;
    private _age: number;
    private _name: string;
    private _createdAt: Date = new Date();
    private _isBlocked: boolean = false;

    constructor(email: string, name: string, age: number, hashPassword?: string) {
        if (hashPassword) {
            this._password = hashPassword;
        };

        this._email = email;
        this._name = name;
        this._age = age;
    }

    public async setPassword(password: string, salt: number) {
        this._password = await hash(password, salt);
    }

    public setRole(role: UserRoles) {
        this._role = role;
    }

    public setIsBlocked(value: boolean) {
        this._isBlocked = value;
    }

    public async comparePassword(password: string): Promise<boolean> {
        return await compare(password, this._password);
    }

    public get email() {
        return this._email;
    }

    public get password() {
        return this._password;
    }

    public get role() {
        return this._role;
    }

    public get age() {
        return this._age;
    }

    public get name() {
        return this._name;
    }

    public get createdAt() {
        return this._createdAt;
    }

    public get isBlocked() {
        return this._isBlocked;
    }
} 
import { UserRoles } from "../common/user.roles.js";
import { compare, hash } from "bcryptjs";

export class User {
    private _password: string;
    private _email: string;
    private _name: string;
    private readonly _age: number;
    private _role: string;
    private readonly _createdAt: Date;
    private _isBloced: boolean;

    constructor(data: {
        email: string;
        name: string;
        age: number;
        hashPassword?: string;
    }) {
        if (data.hashPassword) {
            this._password = data.hashPassword;
        };

        this._role = UserRoles.USER;
        this._createdAt = new Date();
        this._isBloced = false;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public get name(): string {
        return this._name;
    }

    public get age(): number {
        return this._age;
    }

    public get role(): string {
        return this._role;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get isBloced(): boolean {
        return this._isBloced;
    }


    public async setPassword(password: string, salt: number): Promise<void> {
        this._password = await hash(password, salt);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return compare(password, this._password);
    }

    public setName(newName: string): void {
        this._name = newName;
    }

    public setEmail(newEmail: string): void {
        this._email = newEmail;
    }

    public setRole(role: UserRoles): void {
        this._role = role;
    }

    public setBloced(): void {
        this._isBloced = true;
    }

    public setUnbloced(): void {
        this._isBloced = false;
    }
}
export interface IConfigService {
    get: (key: string) => string;

    readonly port: number;
    readonly host: string;
    readonly salt: number;
    readonly secretJwt: string;
    readonly expiresInSecond: number;
}
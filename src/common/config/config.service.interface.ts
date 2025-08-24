export interface IConfigService {
    get: (key: string) => string;

    readonly port: number;
    readonly host: string;
}
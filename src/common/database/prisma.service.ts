import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import { ILoggerService } from "../logger/logger.service.interface.js";


@injectable()
export class PrismaService extends PrismaClient {
    constructor(
        @inject(TYPES.LoggerService) private logger: ILoggerService
    ) {
        super()
    }

    public async connect() {
        try {
            await this.$connect();
            this.logger.info(`[PrismaService] - загружен`);
        } catch (error) {
            if (error instanceof Error) {
                this.logger.error(`[PrismaService] - ошибка подключения ${error.message}`);
            };
        };
    }

    public async disconnect() {
        await this.$disconnect();
    }
}
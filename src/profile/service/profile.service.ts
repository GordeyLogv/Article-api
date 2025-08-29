// import { inject, injectable } from "inversify";
// import { IProfileService } from "./profile.service.interface.js";
// import { TYPES } from "../../types.js";
// import { IAuthRepository } from "../../authorization/repository/auth.repository.interface.js";
// import { UserModel } from "@prisma/client";

// @injectable()
// export class ProfileService implements IProfileService {
//     constructor(
//         @inject(TYPES.AuthRepository) private authRepository: IAuthRepository
//     ) {}
    
//     profile(id: number): Promise<UserModel> {
//         const existedUser = this.authRepository.find()
//     }
// }
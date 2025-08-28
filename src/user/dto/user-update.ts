import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UserUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    email?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Введите ваше имя'})
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Введите пароль'})
    password?: string
}
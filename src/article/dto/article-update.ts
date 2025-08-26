import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";


export class ArticleUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Название статьи не должно быть пустым' })
    title: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Текст статьи не должен быть пустым' })
    content: string;

    @IsOptional()
    @IsUrl({}, { message: 'Ссылка на картинку должна быть корректным URL' })
    imageUrl: string;
}
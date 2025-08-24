import { IsNotEmpty, IsString, IsUrl } from "class-validator";


export class ArticleCreateDto {
    @IsString()
    @IsNotEmpty({ message: 'Название статьи не должно быть пустым' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Текст статьи не должен быть пустым' })
    content: string;

    @IsUrl({}, { message: 'Ссылка на картинку должна быть корректным URL' })
    imageUrl: string;
}
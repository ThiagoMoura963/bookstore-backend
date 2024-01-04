import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookDTO {
    @IsString()
    @IsNotEmpty({ message: 'O título do livro é obriagório' })
    title: string;
}
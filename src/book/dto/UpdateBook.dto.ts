import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export class updateBookDTO {
    @IsString()
    @IsNotEmpty({ message: 'O título do livro é obriagório' })
    @IsOptional()
    title: string;
}
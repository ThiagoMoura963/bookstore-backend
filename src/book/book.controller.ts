import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put 
} from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDTO } from './dto/CreateBook.dto';
import { BookEntity } from './book.entity';
import { v4 as uuid } from 'uuid';
import { updateBookDTO } from './dto/UpdateBook.dto';

@Controller('/books')
export class BookController {
    constructor(private bookRepository: BookRepository) { }
    
    @Get()
    async listBooks() {
        return this.bookRepository.list();
    }

    @Post() 
    async createBook(@Body() book: CreateBookDTO) {
        const bookEntity = new BookEntity();

        bookEntity.id = uuid();
        
        Object.assign(bookEntity, book);

        this.bookRepository.save(bookEntity);
        
        return {
            book: bookEntity,
            message: 'criado com sucesso'
        }
    }

    @Put('/:id')
    async updateBook(
        @Param('id') id: string, 
        @Body() book: updateBookDTO 
    ) {
        const updateBook = await this.bookRepository.update(id, book);

        return {
            book: updateBook,
            message: 'atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeBook(@Param('id') id: string) {
        const removeBook = await this.bookRepository.remove(id);

        return {
            book: removeBook,
            message: 'removido com sucesso'
        }
    }
}
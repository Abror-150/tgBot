import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private book: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto) {
    const book = await this.book.create(createBookDto);
    return book;
  }

  async findAll() {
    let data = await this.book.find();
    return data;
  }

  async findOne(id: string) {
    let data = await this.book.findById(id);
    return data;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    let updated = await this.book.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
    return updated;
  }

  async remove(id: string) {
    let deleted = await this.book.findByIdAndDelete(id);
    return deleted;
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TgModule } from './tg/tg.module';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.scheme';
import { TgService } from './tg/tg.service';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';
import { BookSchema } from './book/entities/book.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-tg_bot'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),BookModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService, TgService, BookService],
})
export class AppModule {}

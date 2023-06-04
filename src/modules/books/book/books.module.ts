import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/auth/auth.module';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthorsModule } from '../author/authors.module';

@Module({
  imports: [DatabaseModule, AuthModule, forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@decorators/api-route';
import { ForeignKeyDeletionExceptionFilter } from '@filters/fk-deletion-exception.filter';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.auth-guard';

import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { PersistedAuthorDto } from './dto/persisted-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { BooksService } from '../book/books.service';
import { PersistedBookDto } from '../book/dto/persisted-book.dto';

@UseGuards(JwtAuthGuard)
@Controller('authors')
@ApiTags('crud-authors')
@ApiBearerAuth()
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  @Get()
  @ApiRoute({
    summary: 'Get all authors',
    description: 'Retrieves all the authors',
    ok: { type: [PersistedAuthorDto], description: 'The books authors' },
  })
  async getAuthors(): Promise<Array<PersistedAuthorDto>> {
    return this.authorsService.getAll();
  }

  @Post()
  @ApiRoute({
    summary: 'Create an author',
    description: 'Creates a new book author',
    created: { type: CreateAuthorDto, description: 'The created author' },
    badRequest: {},
  })
  async createAuthor(
    @Body() newAuthor: CreateAuthorDto,
  ): Promise<PersistedAuthorDto> {
    return this.authorsService.create(newAuthor);
  }

  @Put(':id')
  @ApiRoute({
    summary: 'Update an author',
    description: 'Modifies a book author',
    ok: { type: CreateAuthorDto, description: 'The modified author' },
    notFound: { description: "The requested author wasn't found" },
    badRequest: {},
  })
  async updateAuthor(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() book: UpdateAuthorDto,
  ): Promise<CreateAuthorDto> {
    return this.authorsService.update(id, book);
  }

  @Delete(':id')
  @UseFilters(ForeignKeyDeletionExceptionFilter)
  @ApiRoute({
    summary: 'Delete an author',
    description: 'Removes an author',
    ok: { type: PersistedAuthorDto, description: 'The deleted author' },
    notFound: { description: "The requested author wasn't found" },
  })
  async deleteAuthor(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PersistedAuthorDto> {
    return this.authorsService.deleteById(id);
  }

  @Get(':id/books')
  @ApiRoute({
    summary: "Gets the author's books",
    description: "Retrieves the author's books",
    ok: {
      type: [PersistedBookDto],
      description: 'The books written by that author',
    },
    notFound: {},
    badRequest: {},
  })
  @ApiTags('crud-authors', 'crud-books')
  async getAuthorBooks(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Array<PersistedBookDto>> {
    return this.booksService.getByAuthorId(id);
  }
}

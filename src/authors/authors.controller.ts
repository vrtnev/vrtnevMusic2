import {
  Body,
  Controller,
  Delete,
  Get,
  HttpService,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put, Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { AuthorsService } from './authors.service';
import { Observable, of, zip } from 'rxjs';
import { Authors } from './entity/authors.entity';
import { catchError, flatMap, map } from 'rxjs/operators';
import { CreateAuthorsDto } from './dto/create-authors.dto';
import { AuthorsResult } from './models/AuthorsResult.model';
import { DeleteResult } from 'typeorm';
import { UpdateAuthorsDto } from './dto/update-authors.dto';
import { GetAllDto } from './dto/get-all.dto';

export const peopleServiceUrl: string = 'http://persons.std-247.ist.mospolytech.ru';

@ApiUseTags('authors')
@UseInterceptors(LoggingInterceptor)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService,
              private readonly httpService: HttpService) {
  }

  @Get(':id')
  getById(@Param('id') id: number): Observable<AuthorsResult> {
    return this.authorsService.getById(id)
      .pipe(
        flatMap(a => {
          return zip(of(a), this.httpService.get(`${peopleServiceUrl}/person/${a.peopleId}`)
            .pipe(map(res => res.data)));
        }),
        map(([a, person]) => Object.assign(a, { peopleId: person })),
        catchError(e => {
          if (e.name === 'EntityNotFound') {
            throw new NotFoundException(e.message);
          }
          return of(e);
        }),
      );
  }

  @Get()
  getAll(@Query() opts: GetAllDto): Observable<Authors[]> {
    return this.authorsService.getAll(opts.offset, opts.limit, opts.sort);
  }

  @Post()
  create(@Body() opts: CreateAuthorsDto): Observable<AuthorsResult> {
    return this.httpService.post(`${peopleServiceUrl}/person`, opts.peopleId)
      .pipe(
        map(res => res.data.data),
        flatMap(person => {
          return zip(of(person), this.authorsService.create(Object.assign(opts, { peopleId: person.id })));
        }),
        map(([person, author]) => {
          return Object.assign(author, { peopleId: person });
        }),
        catchError(err => {
          throw new InternalServerErrorException(err);
        }),
      );
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() options: UpdateAuthorsDto): Observable<AuthorsResult> {
    return this.httpService.post(`${peopleServiceUrl}/person`, options.peopleId)
      .pipe(
        map(res => res.data.data),
        flatMap(person => {
          return zip(of(person), this.authorsService.update(id, Object.assign(options, { peopleId: person.id })));
        }),
        map(([person, author]) => {
          return Object.assign(author, { peopleId: person });
        }),
        catchError(err => {
          throw new InternalServerErrorException(err);
        }),
      );
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.authorsService.deleteById(id).pipe(
      catchError(err => {
        throw new InternalServerErrorException(err);
      }),
    );
  }
}

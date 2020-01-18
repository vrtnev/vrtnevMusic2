import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Authors } from './entity/authors.entity';
import { ICreateAuthorsDto } from './dto/i-create-authors.dto';
import { IUpdateAuthorsDto } from './dto/i-update-authors.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Authors) private readonly authorsRepository: Repository<Authors>) {
  }

  getAll(offset: number = 0, limit: number = 5, sort: 'ASC' | 'DESC' = 'ASC'): Observable<Authors[]> {
    return from(this.authorsRepository.find({ order: { authorId: sort }, take: limit, skip: offset }));
  }

  create(options: ICreateAuthorsDto): Observable<Authors> {
    return from(this.authorsRepository.save(options));
  }

  getById(id: number): Observable<Authors> {
    return from(this.authorsRepository.findOneOrFail(id));
  }

  deleteById(id: number): Observable<DeleteResult> {
    return from(this.authorsRepository.delete(id));
  }

  update(id: number, options: IUpdateAuthorsDto): Observable<Authors> {
    return from(this.authorsRepository.update(id, options))
      .pipe(
        flatMap(() => this.getById(id)),
      );
  }
}

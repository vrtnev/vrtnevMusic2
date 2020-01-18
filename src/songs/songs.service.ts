import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {from, Observable, of} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {Songs} from './entity/songs.entity';
import {CreateSongsDto} from './dto/create-songs.dto';
import {UpdateSongsDto} from './dto/update-songs.dto';
import {prepareSearchParams, removeEmptyFields} from '../utils/utils';
import {SearchParams} from '../exceptions/search.params';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Songs) private readonly songsRepository: Repository<Songs>) {
    }

    getAll(): Observable<Songs[]> {
        return from(this.songsRepository.find());
    }

    create(options: CreateSongsDto): Observable<Songs> {
        return from(this.songsRepository.save(options));
    }

    getById(songid: number): Observable<Songs> {
        return from(this.songsRepository.findOneOrFail(songid))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(songid: number): Observable<DeleteResult> {
        return from(this.songsRepository.delete(songid));
    }

    update(songid: number, options: UpdateSongsDto): Observable<UpdateResult> {
        return from(this.songsRepository.update(songid, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Songs[]> {
        return from(this.songsRepository.query(
            `SELECT * FROM users WHERE songid LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No songid found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(paramsb: CreateSongsDto): Observable<Songs[]> {
        const rawParamsb: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(paramsb));
        // @ts-ignore
        return from(this.songsRepository.find(rawParamsb));
        /*return from(this.buyGameRepository.find());*/
           }
}

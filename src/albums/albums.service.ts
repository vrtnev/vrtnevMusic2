import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {from, Observable, of} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {Albums} from './entity/albums.entity';
import {CreateAlbumsDto} from './dto/create-albums.dto';
import {UpdateAlbumsDto} from './dto/update-albums.dto';
import {SearchParams} from '../exceptions/search.params';
import {prepareSearchParams, removeEmptyFields} from '../utils/utils';
@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Albums) private readonly albumsRepository: Repository<Albums>) {
    }

    getAll(): Observable<Albums[]> {
        return from(this.albumsRepository.find());
    }

    create(options: CreateAlbumsDto): Observable<Albums> {
        return from(this.albumsRepository.save(options));
    }

    getById(idalbum: number): Observable<Albums> {
        return from(this.albumsRepository.findOneOrFail(idalbum))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(idalbum: number): Observable<DeleteResult> {
        return from(this.albumsRepository.delete(idalbum));
    }

    update(idalbum: number, options: UpdateAlbumsDto): Observable<UpdateResult> {
        return from(this.albumsRepository.update(idalbum, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Albums[]> {
        return from(this.albumsRepository.query(
            `SELECT * FROM buygame WHERE idalbum LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No idalbum found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(paramsa: CreateAlbumsDto): Observable<Albums[]> {
        const rawParamsa: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(paramsa));
        // @ts-ignore
        return from(this.albumsRepository.find(rawParamsa));
        /*return from(this.albumsRepository.find());*/
    }
}

import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {from, Observable, of, zip} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {Relations} from './entity/relations.entity';
import { flatMap } from 'rxjs/operators';
import {CreateRelationsDto} from './dto/create-relations.dto';
import {UpdateRelationsDto} from './dto/update-relations.dto';
import {prepareSearchParams, removeEmptyFields} from '../utils/utils';
import {SearchParams} from '../exceptions/search.params';
import {RelationsResult} from './models/createResult.model';
@Injectable()
export class RelationsService {
    constructor(
        @InjectRepository(Relations) private readonly relationsRepository: Repository<Relations>) {
    }

    getAll(): Observable<Relations[]> {
        return from(this.relationsRepository.find());
    }

    create(options: CreateRelationsDto): Observable<Relations> {
        return from(this.relationsRepository.save(options));
    }

    getById(relationsid: number): Observable<Relations> {
        return from(this.relationsRepository.findOneOrFail(relationsid))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(relationsid: number): Observable<DeleteResult> {
        return from(this.relationsRepository.delete(relationsid));
    }

    update(relationsid: number, options: UpdateRelationsDto): Observable<UpdateResult> {
        return from(this.relationsRepository.update(relationsid, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Relations[]> {
        return from(this.relationsRepository.query(
            `SELECT * FROM relations WHERE relationsid LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No relationsid found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(params: CreateRelationsDto): Observable<Relations[]> {
        const rawParams: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(params));
        return from(this.relationsRepository.find(rawParams));
        /*return from(this.relationsRepository.find());*/
    }
}

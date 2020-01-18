import {
    BadRequestException,
    Body,
    ConflictException,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Query, UseInterceptors,
    HttpCode,
    UsePipes,
} from '@nestjs/common';
import {ApiImplicitQuery, ApiUseTags, ApiResponse} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {catchError, first, flatMap, map} from 'rxjs/operators';
import {DatabaseException} from '../exceptions/database.exception';
import {LoggingInterceptor} from '../interceptors/logging.interceptor';
import {RelationsService} from './relations.service';
import {Relations} from './entity/relations.entity';
import {CreateRelationsPipe} from '../pipes/create-relations-pipe.service';
import {CreateRelationsDtoValidationPipe} from '../pipes/create-relations-dto-validation-pipe.service';
import {CreateRelationsDto} from './dto/create-relations.dto';
import {UpdateRelationsDto} from './dto/update-relations.dto';
import {RemovalRelationsDto} from './dto/removal-relations.dto';
import { RelationsResult } from './models/createResult.model';
import {NotFoundFieldsException, SearchParams, SearchParamsWithError} from '../exceptions/search.params';

@ApiUseTags('relations')
@UseInterceptors(LoggingInterceptor)
@Controller('relations')
export class AuthorsController {
    constructor(private readonly relationsService: RelationsService) {}

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full relationsid/recommendedage/countrylist/relationsname/gameprice/releasedate separately' })
    @ApiImplicitQuery({ name: 'relationsname', required: false })
    @ApiImplicitQuery({ name: 'relationsid', required: false })
    get(@Query('query') query?: string,
        @Query('relationsname') relationsname?: string,
        @Query('relationsid') relationsid?: number,
    ): Observable<Relations[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.relationsService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        } else if ( relationsname || relationsid) {
            const searchParams: SearchParams = {
                relationsname: relationsname || null,
                relationsid: relationsid || null,
            };
            return this.relationsService.search(searchParams)
                .pipe(
                    first(),
                    map((res: Relations[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithError = {message: 'No giveout found for given data', data: searchParams};
                            throw new NotFoundFieldsException(paramsWithError);
                        }
                        return res;
                    }),
                );
        }
        return this.relationsService.getAll();
    }

    @Get(':relationsid')
    getById(@Param('relationsid') relationsid: number): Observable<Relations> {
        return this.relationsService.getById(relationsid).pipe(
            first(),
        );
    }

    @Post()
    @ApiResponse({ status: 200, type: Relations })
    @HttpCode(200)
    @UsePipes(CreateRelationsPipe, CreateRelationsDtoValidationPipe)
    create(@Body() options: CreateRelationsDto): Observable<Relations> {
        return this.relationsService.create(options)
            .pipe(
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Put(':relationsid')
    update(@Param('relationsid') relationsid: number, @Body() options: UpdateRelationsDto): Observable<Relations> {
        return this.relationsService.update(relationsid, options)
            .pipe(
                first(),
                flatMap(res => this.relationsService.getById(relationsid).pipe(first())),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Delete(':relationsid')
    delete(@Param('relationsid') relationsid: number): Observable<RemovalRelationsDto> {
        return this.relationsService.getById(relationsid).pipe(
            first(),
            flatMap(() => this.relationsService.deleteById(relationsid)),
            first(),
            map(res => res.raw.affectedRows),
            map(affectedRows => {
                return {
                    affectedRows,
                    ok: affectedRows && affectedRows > 0,
                };
            }),
            catchError(err => {
                throw new DatabaseException(err.message);
            }),
        );
    }
}

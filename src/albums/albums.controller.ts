import {
    BadRequestException,
    Body,
    ConflictException,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Query, UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import {ApiImplicitQuery, ApiUseTags, ApiResponse} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {catchError, first, flatMap, map} from 'rxjs/operators';
import {DatabaseException} from '../exceptions/database.exception';
import {LoggingInterceptor} from '../interceptors/logging.interceptor';
import {AlbumsService} from './albums.service';
import {Albums} from './entity/albums.entity';
import {CreateAlbumsDtoValidationPipe} from '../pipes/create-albums-dto-validation.pipe';
import {CreateAlbumsPipe} from '../pipes/create-albums.pipe';
import {CreateAlbumsDto} from './dto/create-albums.dto';
import {UpdateAlbumsDto} from './dto/update-albums.dto';
import {RemovalAlbumsDto} from './dto/removal-albums.dto';
import {AlbumsResult} from './models/AlbumsResult.model';
import {NotFoundFieldsException, SearchParamsa, SearchParamsWithErrora} from '../exceptions/search.params';
import {Relations} from '../relations/entity/relations.entity';

@ApiUseTags('albums')
@UseInterceptors(LoggingInterceptor)
@Controller('albums')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full idalbums/databought separately' })
    @ApiImplicitQuery({ name: 'idalbums', required: false })
    @ApiImplicitQuery({ name: 'userid', required: false })
    @ApiImplicitQuery({ name: 'relationsid', required: false })
       get(@Query('query') query?: string,
           @Query('idalbums') idalbums?: number,
           @Query('name') name?: string,
           @Query('cover') cover?: string,
           @Query('relationsid') relationsid?: number,
          ): Observable<Albums[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.albumsService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        } else if ( relationsid || name  ) {
            const searchParamsa: SearchParamsa = {
                name: name || null,
                cover: cover || null,
                relationsid: relationsid || null,

            };
            return this.albumsService.search(searchParamsa)
                .pipe(
                    first(),
                    map((res: Albums[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithErrora = {message: 'No giveout found for given data', data: searchParamsa};
                        }
                        return res;
                    }),
                );
        }
        return this.albumsService.getAll();
    }

    @Get(':idalbums')
    getById(@Param('idalbums') idalbums: number): Observable<Albums> {
        return this.albumsService.getById(idalbums).pipe(
            first(),
        );
    }

    @Post()
    @ApiResponse({ status: 200, type: AlbumsResult })
    @UsePipes(CreateAlbumsPipe, CreateAlbumsDtoValidationPipe)
    create(@Body() options: CreateAlbumsDto): Observable<Albums> {
        return this.albumsService.search(options)
            .pipe(
                map(res => {
                    return res;
                }),
                flatMap(() => this.albumsService.create(options)),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Put(':idalbums')
    update(@Param('idalbums') idalbums: number, @Body() options: UpdateAlbumsDto): Observable<Albums> {
        return this.albumsService.update(idalbums, options)
            .pipe(
                first(),
                flatMap(res => this.albumsService.getById(idalbums).pipe(first())),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Delete(':idalbums')
    delete(@Param('idalbums') idalbums: number): Observable<RemovalAlbumsDto> {
        return this.albumsService.getById(idalbums).pipe(
            first(),
            flatMap(() => this.albumsService.deleteById(idalbums)),
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

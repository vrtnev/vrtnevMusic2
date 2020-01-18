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
import {ApiImplicitQuery, ApiUseTags} from '@nestjs/swagger';
import {Observable} from 'rxjs';
import {catchError, first, flatMap, map} from 'rxjs/operators';
import {DatabaseException} from '../exceptions/database.exception';
import {NotFoundFieldsException, SearchParamsb, SearchParamsWithErrorb} from '../exceptions/search.params';
import {LoggingInterceptor} from '../interceptors/logging.interceptor';
import {SongsService} from './songs.service';
import {Songs} from './entity/songs.entity';
import {CreateSongsDto} from './dto/create-songs.dto';
import {UpdateSongsDto} from './dto/update-songs.dto';
import {RemovalSongsDto} from './dto/removal-songs.dto';
import {CreateSongsPipe} from '../pipes/create-songs.pipe';
import {CreateSongsDtoValidationPipe} from '../pipes/create-songs-dto-validation.pipe';

@ApiUseTags('songs')
@UseInterceptors(LoggingInterceptor)
@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full songid/name/file separately' })
    @ApiImplicitQuery({ name: 'songid', required: false })
    @ApiImplicitQuery({ name: 'name', required: true })
    @ApiImplicitQuery({ name: 'file', required: true })
    @ApiImplicitQuery({ name: 'relationsid', required: false })
    @ApiImplicitQuery({ name: 'albumid', required: false })

       get(@Query('query') query?: string,
           @Query('songid') songid?: number,
           @Query('name') name?: string,
           @Query('file') file?: string,
           @Query('relationsid') relationsid?: number,
           @Query('albumid') albumid?: number,

    ): Observable<Songs[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.songsService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        } else if ( name || file ) {
            const searchParamsb: SearchParamsb = {
                name: name || null,
                file: file || null,

            };
            return this.songsService.search(searchParamsb)
                .pipe(
                    first(),
                    map((res: Songs[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithErrorb = {message: 'No giveout found for given data', data: searchParamsb};
                        }
                        return res;
                    }),
                );
        }
        return this.songsService.getAll();
    }

    @Get(':songid')
    getById(@Param('songid') songid: number): Observable<Songs> {
        return this.songsService.getById(songid).pipe(
            first(),
        );
    }

    @Post()
    @UsePipes(CreateSongsPipe, CreateSongsDtoValidationPipe)
    create(@Body() options: CreateSongsDto): Observable<Songs> {
        return this.songsService.search(options)
            .pipe(
                map(res => {
                    /*if (res && res.length !== 0) {
                        throw new ConflictException('Songid already exists');
                    }*/
                    return res;
                }),
                flatMap(() => this.songsService.create(options)),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Put(':songid')
    update(@Param('songid') songid: number, @Body() options: UpdateSongsDto): Observable<Songs> {
        return this.songsService.update(songid, options)
            .pipe(
                first(),
                flatMap(res => this.songsService.getById(songid).pipe(first())),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Delete(':songid')
    delete(@Param('songid') songid: number): Observable<RemovalSongsDto> {
        return this.songsService.getById(songid).pipe(
            first(),
            flatMap(() => this.songsService.deleteById(songid)),
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

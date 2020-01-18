import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {CreateSongsDto} from '../songs/dto/create-songs.dto';

@Injectable()
export class CreateSongsPipe implements PipeTransform {
    transform(opts: CreateSongsDto, metadata: ArgumentMetadata): CreateSongsDto {
        return Object.assign(opts, {
           /* userid: opts.userid,*/
        });
    }
}

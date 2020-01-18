import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {CreateAlbumsDto} from '../albums/dto/create-albums.dto';

@Injectable()
export class CreateAlbumsPipe implements PipeTransform {
    transform(opts: CreateAlbumsDto, metadata: ArgumentMetadata): CreateAlbumsDto {
        return Object.assign(opts, {
          /*  idbought: opts.idbought,*/
        });
    }
}

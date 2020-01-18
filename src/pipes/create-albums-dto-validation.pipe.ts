import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {CreateAlbumsDto} from '../albums/dto/create-albums.dto';

@Injectable()
export class CreateAlbumsDtoValidationPipe implements PipeTransform {
    transform(value: CreateAlbumsDto, metadata: ArgumentMetadata): CreateAlbumsDto {
        return value;
    }
}

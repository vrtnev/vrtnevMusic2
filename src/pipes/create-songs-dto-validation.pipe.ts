import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {CreateSongsDto} from '../songs/dto/create-songs.dto';

@Injectable()
export class CreateSongsDtoValidationPipe implements PipeTransform {
    transform(value: CreateSongsDto, metadata: ArgumentMetadata): CreateSongsDto {
        return value;
    }
}

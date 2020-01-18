import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {CreateRelationsDto} from '../relations/dto/create-relations.dto';

@Injectable()
export class CreateRelationsDtoValidationPipe implements PipeTransform {
    transform(value: CreateRelationsDto, metadata: ArgumentMetadata): CreateRelationsDto {
        return value;
    }
}

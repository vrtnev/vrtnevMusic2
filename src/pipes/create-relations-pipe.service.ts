import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {CreateRelationsDto} from '../relations/dto/create-relations.dto';
import {toCanonical} from '../utils/utils';

@Injectable()
export class CreateRelationsPipe implements PipeTransform {
    transform(opts: CreateRelationsDto, metadata: ArgumentMetadata): CreateRelationsDto {
        return Object.assign(opts, {
            /*gameid: opts.gameid,*/
            relationsname : toCanonical(opts.relationsname),
        });
    }
}

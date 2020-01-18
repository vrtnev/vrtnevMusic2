import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRYLIST_LENGTH, MAX_GAMENAME_LENGTH} from '../entity/relations.entity';

export class UpdateRelationsDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'relationsid',
        nullable: true,
        pattern: 'Int',
        example: '16',
        required: false,
        type: 'string',
    })
    readonly relationsid?: number;
}

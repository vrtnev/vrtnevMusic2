import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRYLIST_LENGTH, MAX_GAMENAME_LENGTH} from '../entity/relations.entity';

export class CreateRelationsDto {
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

    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_GAMENAME_LENGTH)
    @ApiModelProperty({
        description: 'Game name',
        maxLength: MAX_GAMENAME_LENGTH,
        nullable: false,
        example: 'Age of Empires ll',
        required: true,
    })
    readonly relationsname: string;
}

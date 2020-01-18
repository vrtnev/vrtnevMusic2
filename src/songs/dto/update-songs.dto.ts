import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRY_LENGTH} from '../entity/songs.entity';

export class UpdateSongsDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_COUNTRY_LENGTH)
    @ApiModelProperty({
        description: 'Название песни',
        maxLength: MAX_COUNTRY_LENGTH,
        nullable: false,
        example: 'New Romantics',
        required: true,
    })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'User age',
        nullable: true,
        pattern: 'Int',
        example: '30',
        required: false,
        type: 'string',
    })
    readonly file: string;

    @IsString()
    @IsOptional()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'relationsid',
        nullable: true,
        pattern: 'Int',
        example: '101',
        required: false,
        type: 'string',
    })
    readonly relationsid?: number;

    @IsString()
    @IsOptional()
    @MaxLength(11)
    @ApiModelProperty({
        description: 'albumid',
        nullable: true,
        pattern: 'Int',
        example: '16',
        required: false,
        type: 'string',
    })
    readonly albumid?: number;
}

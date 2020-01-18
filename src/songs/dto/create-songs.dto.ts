import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRY_LENGTH} from '../entity/songs.entity';

export class CreateSongsDto {
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
    @MaxLength(256)
    @ApiModelProperty({
        description: 'Ссылка на трек',
        maxLength: MAX_COUNTRY_LENGTH,
        nullable: false,
        example: 'https://www.youtube.com/watch?v=wyK7YuwUWsU',
        required: true,
    })
    readonly file: string;

    @IsString()
    @IsOptional()
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

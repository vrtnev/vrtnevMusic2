import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRY_LENGTH} from "../../songs/entity/songs.entity";

export class UpdateAlbumsDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @ApiModelProperty({
        description: 'Название альбома',
        maxLength: MAX_COUNTRY_LENGTH,
        nullable: false,
        example: '1989 - Deluxe edition',
        required: false,
    })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @ApiModelProperty({
        description: 'Ссылка на обложку альбома',
        maxLength: MAX_COUNTRY_LENGTH,
        nullable: false,
        example: 'https://cdn1.ozone.ru/multimedia/c650/1011395718.jpg',
        required: false,
    })
    readonly cover: string;

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
}

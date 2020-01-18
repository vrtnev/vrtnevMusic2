import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRY_LENGTH} from '../../songs/entity/songs.entity';
import { CreatePeopleDto } from './create-people.dto';

export class CreateAuthorsDto {

    @IsNotEmpty()
    @ApiModelProperty({
        description: 'Модель человека',
        nullable: false,
        required: true,
        type: CreatePeopleDto,
    })
    readonly peopleId: CreatePeopleDto;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(MAX_COUNTRY_LENGTH)
    @ApiModelProperty({
        description: 'Ссылка на фото',
        type: 'string',
        maxLength: MAX_COUNTRY_LENGTH,
        nullable: true,
        example: 'https://cdn1.ozone.ru/multimedia/c650/1011395718.jpg',
        required: false,
    })
    readonly photo?: string;
}

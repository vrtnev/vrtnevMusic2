import { CreatePeopleDto } from './create-people.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateAuthorsDto {
    @IsOptional()
    @IsNotEmpty()
    @ApiModelPropertyOptional({type: CreatePeopleDto, description: 'Модель человека'})
    readonly peopleId?: CreatePeopleDto;

    @IsOptional()
    @IsNotEmpty()
    @ApiModelPropertyOptional({type: 'string', description: 'Ссылка на фото'})
    readonly photo?: string;
}

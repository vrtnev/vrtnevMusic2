import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreatePeopleDto } from './create-people.dto';
import { MAX_COUNTRY_LENGTH } from '../../songs/entity/songs.entity';

export class ICreateAuthorsDto {
  @IsNotEmpty()
  @IsNumber()
  readonly peopleId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(MAX_COUNTRY_LENGTH)
  readonly photo?: string;
}

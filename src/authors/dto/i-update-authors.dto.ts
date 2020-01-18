import { IsNumber, IsOptional, IsString } from 'class-validator';

export class IUpdateAuthorsDto {
  @IsOptional()
  @IsNumber()
  readonly peopleId: number;

  @IsOptional()
  @IsString()
  readonly photo?: string;
}

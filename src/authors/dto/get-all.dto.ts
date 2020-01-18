import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class GetAllDto {
  @ApiModelPropertyOptional({ type: 'string', example: 'DESC', enum: ['DESC', 'ASC'], nullable: true })
  @IsOptional()
  @IsNumberString()
  sort?: 'ASC' | 'DESC';

  @ApiModelPropertyOptional({ type: 'number', example: 0, nullable: true })
  @IsOptional()
  @IsNumberString()
  offset?: number;

  @ApiModelPropertyOptional({ type: 'number', nullable: true, example: 3, default: 5 })
  @IsOptional()
  @IsNumberString()
  limit?: number;
}

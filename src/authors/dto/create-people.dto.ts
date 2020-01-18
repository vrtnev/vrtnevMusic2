import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePeopleDto {
  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({
    nullable: false,
    example: 'Sergey',
    required: true,
  })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({
    nullable: false,
    example: 'Vladimirovich',
    required: true,
  })
  readonly middleName: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({
    nullable: false,
    example: 'Shnurov',
    required: true,
  })
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({
    nullable: false,
    example: 'example@mail.ru',
    required: true,
  })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @ApiModelProperty({
    nullable: true,
    maxLength: 10,
    pattern: 'yyyy-mm-dd',
    example: '2000-06-01',
    required: false,
    type: 'string',
  })
  readonly birthday?: string;

  @IsEnum(['male', 'female'])
  @IsOptional()
  @ApiModelProperty({
    nullable: true,
    enum: ['male', 'female'],
    required: false,
    example: 'male',
  })
  readonly gender?: string;

  @IsNumber()
  @IsOptional()
  @ApiModelProperty({
    nullable: true,
    example: 88005553535,
    type: 'number',
    required: false,
  })
  readonly phone?: number;
}

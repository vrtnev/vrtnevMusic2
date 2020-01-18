import { ApiModelProperty } from '@nestjs/swagger';

export class AuthorsResult {
  @ApiModelProperty({ type: 'int', description: 'ID исполнителя', example: 1 })
  authorId: number;

  @ApiModelProperty({ type: 'object', description: 'Модель человека из PeopleService', example: {}, nullable: false })
  peopleId: any;

  @ApiModelProperty({ type: 'string', description: 'Ссылка на фото', nullable: true })
  photo?: string;

}

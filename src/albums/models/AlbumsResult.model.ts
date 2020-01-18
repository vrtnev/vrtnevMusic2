import { ApiModelProperty } from '@nestjs/swagger';
import { Albums } from '../entity/albums.entity';

export class AlbumsResult {
  @ApiModelProperty({
    required: true, nullable: false, type: Albums, example: {
      idalbums: '1'
    },
  })
  data: Albums;

}

import { ApiModelProperty } from '@nestjs/swagger';
import {Songs} from '../entity/songs.entity';

export class SongResult {
  @ApiModelProperty({
    required: true, nullable: false, type: Songs, example: {
      songid: '1',
      name: 'Poland',
      age: '16',
    },
  })
  data: Songs;
}

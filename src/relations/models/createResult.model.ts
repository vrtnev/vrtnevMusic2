import { ApiModelProperty } from '@nestjs/swagger';
import { Relations } from '../entity/relations.entity';

export class RelationsResult {
  @ApiModelProperty({
    required: true, nullable: false, type: Relations, example: {
      gamename: 'Age of Empires ll',
      recommendedage: '12',
      relationsid: '1',
      countrylist: 'Poland',
      gameprice: '59',
      releasedate: '2002-11-09',
    },
  })
  data: Relations;
}

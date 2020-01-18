import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRY_LENGTH} from '../../songs/entity/songs.entity';
export const MAX_NAME_LENGTH: number = 255;
export const MAX_AUTHOR_LENGTH: number = 255;

@Entity()
@Unique(['idalbums'])
export class Albums {
  @PrimaryGeneratedColumn({ unsigned: true })
  idalbums: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })

  @Column({ type: 'varchar', length: MAX_NAME_LENGTH , nullable: false})
  name: string;

  @Column({ type: 'varchar', length: MAX_NAME_LENGTH , nullable: true})
  cover: string;

  @Column({ type: 'int', default: null})
  relationsid: number;
}

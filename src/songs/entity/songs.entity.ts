import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export const MAX_COUNTRY_LENGTH: number = 255;

@Entity()
@Unique(['songid'])
export class Songs {
  @PrimaryGeneratedColumn({ unsigned: true })
  songid: number;

  @Column({ type: 'varchar', length: MAX_COUNTRY_LENGTH , nullable: false })
  name: string;

  @Column({ type: 'varchar', length: MAX_COUNTRY_LENGTH , nullable: false})
  file: string;

  @Column({ type: 'int', default: null})
  relationsid: number;

  @Column({ type: 'int', default: null})
  albumid: number;

}

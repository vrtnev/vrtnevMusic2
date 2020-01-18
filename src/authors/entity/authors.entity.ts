import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const MAX_NAME_LENGTH: number = 255;
export const MAX_AUTHOR_LENGTH: number = 255;

@Entity()
export class Authors {
  @PrimaryGeneratedColumn({ unsigned: true })
  authorId: number;

  @Column({ type: 'int', nullable: false, unsigned: true })
  peopleId: number;

  @Column({ type: 'varchar', length: MAX_NAME_LENGTH, nullable: true })
  photo: string;
}

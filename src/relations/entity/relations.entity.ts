import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_COUNTRY_LENGTH} from "../../songs/entity/songs.entity";

export const MAX_COUNTRYLIST_LENGTH: number = 255;
export const MAX_GAMENAME_LENGTH: number = 255;

@Entity()
@Unique(['id'])
export class Relations {
    @PrimaryGeneratedColumn({ unsigned: true})
    @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false, required: false, example: 1 })
    id: number;

    @Column({ type: 'int', default: null})
    @ApiModelProperty({ type: 'int', minimum: 0, nullable: true, required: true, example: 12 })
    relationsid: number;

    @Column({ type: 'varchar', length: MAX_COUNTRY_LENGTH , nullable: true})
    relationsname: string;
}

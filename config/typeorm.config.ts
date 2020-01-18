import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Log } from '../src/logger/log.entity';
import {Songs} from '../src/songs/entity/songs.entity';
import {Albums} from '../src/albums/entity/albums.entity';
import {Relations} from '../src/relations/entity/relations.entity';
import { Authors } from '../src/authors/entity/authors.entity';

export let typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'std-mysql',
  port: 3306,
  username: 'std_230',
  password: 'Satana1178',
  database: 'std_230',
  entities: [Songs, Albums, Relations, Log, Authors],
  synchronize: true,
};

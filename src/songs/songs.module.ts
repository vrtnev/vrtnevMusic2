import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LogModule} from '../logger/log.module';
import {SongsController} from './songs.controller';
import {SongsService} from './songs.service';
import {Songs} from './entity/songs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Songs]), LogModule],
  controllers: [SongsController],
  exports: [TypeOrmModule],
  providers: [SongsService],
})
export class SongsModule {}

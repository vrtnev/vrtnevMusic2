import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LogModule} from '../logger/log.module';
import {Albums} from './entity/albums.entity';
import {AlbumsController} from './albums.controller';
import {AlbumsService} from './albums.service';

@Module({
  imports: [TypeOrmModule.forFeature([Albums]), LogModule],
  controllers: [AlbumsController],
  exports: [TypeOrmModule],
  providers: [AlbumsService],
})
export class AlbumsModule {}

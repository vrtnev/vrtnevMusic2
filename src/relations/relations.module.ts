import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LogModule} from '../logger/log.module';
import {Relations} from './entity/relations.entity';
import {AuthorsController} from './authors.controller';
import {RelationsService} from './relations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Relations]), LogModule],
  controllers: [AuthorsController],
  exports: [TypeOrmModule],
  providers: [RelationsService],
})
export class RelationsModule {}

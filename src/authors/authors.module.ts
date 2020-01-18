import { HttpModule, Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LogModule} from '../logger/log.module';
import {AuthorsController} from './authors.controller';
import {AuthorsService} from './authors.service';
import { Authors } from './entity/authors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authors]), LogModule, HttpModule],
  controllers: [AuthorsController],
  exports: [TypeOrmModule],
  providers: [AuthorsService],
})
export class AuthorsModule {}

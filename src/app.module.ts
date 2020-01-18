import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Connection } from 'typeorm';
import { typeOrmOptions } from '../config/typeorm.config';
import { LogModule } from './logger/log.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { SongsModule } from './songs/songs.module';
import { AlbumsModule } from './albums/albums.module';
import { RelationsModule } from './relations/relations.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [SongsModule,
    RelationsModule,
    AlbumsModule,
    TypeOrmModule.forRoot(typeOrmOptions),
    LogModule,
    AuthorsModule],
  providers: [LoggingInterceptor],
  exports: [LoggingInterceptor],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }
}

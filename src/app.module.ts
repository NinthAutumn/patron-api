import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlonikModule } from './slonik';
import { createTypeParserPreset } from 'slonik';

@Module({
  imports: [
    SlonikModule.forRoot({
      connectionConfiguration: `postgres://${process.env.DB_USERNAME}:${
        process.env.DB_PASSWORD
      }@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      clientUserConfiguration: {
        maximumPoolSize: 60,
        typeParsers: [...createTypeParserPreset()],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainsModule } from './domains/domains.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClientOptions } from 'mongodb';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { BasicAuthStrategy } from './auth/basic-auth.middleware';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'basic' }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions),
    DomainsModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasicAuthStrategy],
})
export class AppModule {}

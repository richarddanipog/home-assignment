import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { DomainsService } from 'src/domains/domains.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Domain, DomainSchema } from 'src/schemas/domain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Domain.name, schema: DomainSchema }]),
  ],
  providers: [SchedulerService, DomainsService],
})
export class SchedulerModule {}

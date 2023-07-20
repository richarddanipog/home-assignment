// scheduler.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from './scheduler.service';
import { Domain, DomainDocument } from '../schemas/domain.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { DomainsService } from '../domains/domains.service';

describe('SchedulerService', () => {
  let service: SchedulerService;
  let domainModel: Model<DomainDocument>; // Replace 'any' with your actual document type if known

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulerService,
        DomainsService,
        {
          provide: getModelToken(Domain.name),
          useValue: {
            find: jest.fn(),
            domains: [],
          },
        },
      ],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
    domainModel = module.get<Model<any>>(getModelToken(Domain.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

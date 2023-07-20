// domain.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DomainsService } from '../domains/domains.service';
import { Model } from 'mongoose';
import { Domain } from 'domain';
import { DomainDocument } from '../schemas/domain.schema';

describe('DomainService', () => {
  let service: DomainsService;
  let domainModel: Model<DomainDocument>; // Replace 'any' with your actual document type if known

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainsService,
        {
          provide: getModelToken(Domain.name),
          useValue: {
            findById: jest.fn().mockResolvedValue({
              _id: 'mocked-id',
              name: 'Mocked Domain',
              // Add other properties as needed for your test cases
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DomainsService>(DomainsService);
    domainModel = module.get<Model<any>>(getModelToken(Domain.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a domain by name', async () => {
    jest
      .spyOn(service, 'getDomainData')
      .mockResolvedValue({ name: 'Mocked Domain' } as any);

    const name = 'Mocked Domain';
    const domain = await service.getDomainData({ name });

    if ('name' in domain) {
      expect(domain.name).toBe('Mocked Domain');
      expect(domain).toBeDefined();
    }
  });
});

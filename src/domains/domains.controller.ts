import { Controller, Get, Post, Body } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainDto } from './dto/domain.dto';

@Controller('api/domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Post()
  getDomainData(@Body() domain: DomainDto) {
    return this.domainsService.getDomainData(domain);
  }

  @Post('/analysis')
  insertDomainForAnalyze(@Body() domain: DomainDto) {
    return this.domainsService.insertDomainForAnalyze(domain);
  }
}

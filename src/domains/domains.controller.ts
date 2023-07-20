import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainDto } from './dto/domain.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  getDomainData(@Body() domain: DomainDto) {
    return this.domainsService.getDomainData(domain);
  }

  @Post('/analysis')
  @UseGuards(AuthGuard('basic'))
  insertDomainForAnalyze(@Body() domain: DomainDto) {
    return this.domainsService.insertDomainForAnalyze(domain);
  }
}

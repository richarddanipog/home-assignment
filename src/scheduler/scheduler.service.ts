import axios, { AxiosResponse } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DomainsService } from '../domains/domains.service';
import { DomainDocument } from '../schemas/domain.schema';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private domainService: DomainsService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async analyzeDomains(): Promise<void> {
    this.logger.log('==== Start process analyze domains ===');

    const domains: DomainDocument[] =
      await this.domainService.getDomainsForAnalysis();

    if (!domains || domains.length === 0) {
      this.logger.log('No domains to analyze.');
      return;
    }

    for (const domain of domains) {
      await this.analyzeDomain(domain);
    }

    this.logger.log(`${domains.length} domains were updated.`);
  }

  private async analyzeDomain(domain: DomainDocument): Promise<void> {
    const { name, virusTotal, whoIs } = domain;

    if (!virusTotal) {
      const vtData = await this.getDataFromVT(name);
      if (vtData) {
        domain.virusTotal = vtData;
      }
    }

    if (!whoIs) {
      const whoIsData = await this.getDataFromWhoIs(name);
      if (whoIsData) {
        domain.whoIs = whoIsData;
      }
    }

    if (domain.virusTotal || domain.whoIs) {
      domain.isAnalyzed = true;
    }

    await domain.save();
  }

  private async getDataFromVT(name: string): Promise<AxiosResponse> {
    try {
      this.logger.log(`VIRUS TOTAL - fetch data for: '${name}'.`);

      const url = `${process.env.VIRUS_TOTAL_URL}/${name}`;
      const headers = {
        'x-apikey': process.env.VIRUS_TOTAL_API_KEY,
      };

      return await this.fetchDataFromUrl(url, headers);
    } catch (error) {
      this.logger.error('API request error:', error);
    }
  }

  private async getDataFromWhoIs(name: string): Promise<AxiosResponse> {
    this.logger.log(`WHOIS - fetch data for: '${name}'.`);

    const url = `${process.env.WHO_IS_URL}`;
    const params = {
      apiKey: process.env.WHO_IS_API_KEY,
      outputFormat: 'json',
      domainName: name,
    };

    return await this.fetchDataFromUrl(url, undefined, params);
  }

  private async fetchDataFromUrl<T>(
    url: string,
    headers?: Record<string, string>,
    params?: Record<string, string>,
  ) {
    try {
      const response = await axios.get<T>(url, {
        headers,
        params,
      });

      return response.data;
    } catch (error) {
      this.logger.error('API request error:', error);
      return null;
    }
  }
}

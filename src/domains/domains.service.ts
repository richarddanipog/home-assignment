import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain, DomainDocument } from '../schemas/domain.schema';
import { DomainDto } from './dto/domain.dto';

@Injectable()
export class DomainsService {
  constructor(
    @InjectModel(Domain.name) private readonly domainModel: Model<Domain>,
  ) {}

  private async findDomain(name: string): Promise<Domain | null> {
    return this.domainModel.findOne({ name }).lean().exec();
  }

  async create(domainDto: DomainDto): Promise<Domain> {
    try {
      const domain = new this.domainModel(domainDto);

      return domain.save();
    } catch (error) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async getDomainData({ name }: DomainDto): Promise<Domain | { msg: string }> {
    const domainData = await this.findDomain(name);

    if (domainData && domainData.isAnalyzed) {
      return domainData;
    }

    if (!domainData) {
      await this.create({ name });
    }

    return {
      msg: `No information about '${name}'. Please try again later.`,
    };
  }

  async insertDomainForAnalyze({ name }: DomainDto): Promise<{ msg: string }> {
    const domainExist = await this.findDomain(name);

    if (domainExist) {
      return {
        msg: `Domain '${name}' already exists in the list. Please choose another domain...`,
      };
    }

    await this.create({ name });

    return {
      msg: `Domain '${name}' was added to the list for analyze.`,
    };
  }

  async getDomainsForAnalysis(): Promise<DomainDocument[]> {
    return this.domainModel.find({ isAnalyzed: false }).exec();
  }
}

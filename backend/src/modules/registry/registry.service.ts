import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RegistryDocument } from '../../documents/registry.document';

@Injectable()
export class RegistryService {

  constructor(
    @Inject('RegistryToken')
    private readonly registryModel: Model<RegistryDocument>
  ) {
  }

  async findAll() {
    return await this.registryModel.find({}).exec();
  }

  async create(registryDto: any) {
    const created = new this.registryModel(registryDto);
    return await created.save();
  }

}

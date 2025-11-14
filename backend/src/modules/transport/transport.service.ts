import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TransportDocument } from '../../documents/transport.document';

@Injectable()
export class TransportService {

  constructor(
    @Inject('TransportToken')
    private readonly transportModel: Model<TransportDocument>
  ) {
  }

  async findById(id: string) {
    return await this.transportModel.findOne({_id: id});
  }

  async findAll() {
    return await this.transportModel.find({}).exec();
  }

  async create(transportDto: any) {
    const created = new this.transportModel(transportDto);
    return await created.save();
  }

  async update(transportId: string, transportDto: any) {
    return await this.transportModel.updateOne({ _id: transportId }, transportDto);
  }

  async delete(id: string) {
    return await this.transportModel.deleteOne({ _id: id });
  }  

}

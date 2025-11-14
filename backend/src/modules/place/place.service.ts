import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PlaceDocument } from '../../documents/place.document';

@Injectable()
export class PlaceService {

  constructor(
    @Inject('PlaceToken')
    private readonly placeModel: Model<PlaceDocument>
  ) {
  }

  async findById(id: string) {
    return await this.placeModel.findOne({_id: id});
  }

  async findAll() {
    return await this.placeModel.find({}).exec();
  }

  async create(placeDto: any) {
    const created = new this.placeModel(placeDto);
    return await created.save();
  }

  async update(placeId: string, placeDto: any) {
    return await this.placeModel.updateOne({ _id: placeId }, placeDto);
  }

  async delete(id: string) {
    return await this.placeModel.deleteOne({ _id: id });
  }  

}

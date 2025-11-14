import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PackageDocument } from '../../documents/package.document';

@Injectable()
export class PackageService {

  constructor(
    @Inject('PackageToken')
    private readonly packageModel: Model<PackageDocument>
  ) {
  }

  async findById(id: string) {
    return await this.packageModel.findOne({_id: id});
  }

  async findAll() {
    return await this.packageModel.find({}).exec();
  }

  async create(packageDto: any) {
    const created = new this.packageModel(packageDto);
    return await created.save();
  }

  async update(packageId: string, packageDto: any) {
    return await this.packageModel.updateOne({ _id: packageId }, packageDto);
  }

  async delete(id: string) {
    return await this.packageModel.deleteOne({ _id: id });
  }  

}

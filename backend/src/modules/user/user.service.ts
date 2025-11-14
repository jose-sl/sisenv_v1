import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../../documents/user.document';

@Injectable()
export class UserService {

  constructor(
    @Inject('UserToken')
    private readonly userModel: Model<UserDocument>
  ) {
  }

  async findById(id: string) {
    return await this.userModel.findOne({_id: id});
  }

  async findByNic(nic: string) {
    return await this.userModel.findOne({nic: nic});
  }

  async findAll() {
    return await this.userModel.find({}).exec();
  }

  async create(userDto: any) {
    const created = new this.userModel(userDto);
    return await created.save();
  }

  async update(userId: string, userDto: any) {
    return await this.userModel.updateOne({ _id: userId }, userDto);
  }

  async delete(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }  

}

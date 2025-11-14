import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ShippingDocument } from '../../documents/shipping.document';

@Injectable()
export class ShippingService {

  criteria: any = {};

  constructor(
    @Inject('ShippingToken')
    private readonly shippingModel: Model<ShippingDocument>
  ) {
  }

  async findById(id: string) {
    return await this.shippingModel.findOne({_id: id});
  }

  // async findAll() {
  //   return await this.shippingModel.find({}).exec();
  // }

  async findAll(query: any) {

    this.getCriteria(query);

    const aggregate: any[] = [
      {
        $project: {
          packageId: {
            $toObjectId: '$packageId'
          },
          placeOriginId: {
            $toObjectId: '$placeOriginId'
          },
          placeDestinyId: {
            $toObjectId: '$placeDestinyId'
          },
          transportId: {
            $toObjectId: '$transportId'
          }
          ,
          pilotId: {
            $toObjectId: '$pilotId'
          },
          pilotIdString: {
            $toString: '$pilotId'
          },
          status: '$status'
        }
      },
      {
        $lookup: {
          from: 'package',
          localField: 'packageId',
          foreignField: '_id',
          as: 'package'
        }
      },
      {
        $lookup: {
          from: 'place',
          localField: 'placeOriginId',
          foreignField: '_id',
          as: 'placeOrigin'
        }
      },
      {
        $lookup: {
          from: 'place',
          localField: 'placeDestinyId',
          foreignField: '_id',
          as: 'placeDestiny'
        }
      },
      {
        $lookup: {
          from: 'transport',
          localField: 'transportId',
          foreignField: '_id',
          as: 'transport'
        }
      },
      {
        $lookup: {
          from: 'user',
          localField: 'pilotId',
          foreignField: '_id',
          as: 'pilot'
        }
      },
      {
        $match: this.criteria
      }
    ];

    return await this.shippingModel.aggregate(aggregate);
  }

  async create(shippingDto: any) {
    const created = new this.shippingModel(shippingDto);
    return await created.save();
  }

  async update(shippingId: string, shippingDto: any) {
    return await this.shippingModel.updateOne({ _id: shippingId }, shippingDto);
  }

  async delete(id: string) {
    return await this.shippingModel.deleteOne({ _id: id });
  }  

  getCriteria(params: any) {
    console.log(params);
    this.criteria = {};
    if (Object.keys(params).length > 0){
      this.criteria = {$and: []};

      if (params.pilotId) {
        this.criteria.$and.push({
          pilotIdString: {
            $eq: params.pilotId
          }
        });
      }

      if (params.status) {
        this.criteria.$and.push({
          status: {
            $in: JSON.parse(params.status)
          }
        });
      }
    }
  }
}

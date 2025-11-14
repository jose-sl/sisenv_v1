import {Controller, Get, Delete, Param, Post, Put, Body, Query} from '@nestjs/common';
import {ShippingService} from './shipping.service';

@Controller('api/v1/shipping')
export class ShippingController {

  constructor(private shippingService: ShippingService) {
  }

  // @Get()
  // async getAll() {
  //   return await this.shippingService.findAll();
  // }

  @Get()
  async getAll(@Query() query: any) {
    return await this.shippingService.findAll(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.shippingService.findById(id);
  }

  @Post()
  async create(@Body() shipping: any) {
    return await this.shippingService.create(shipping);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() shipping: any) {
    return await this.shippingService.update(id, shipping);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shippingService.delete(id);
  }
}
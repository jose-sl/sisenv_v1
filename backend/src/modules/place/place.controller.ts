import {Controller, Get, Delete, Param, Post, Put, Body} from '@nestjs/common';
import {PlaceService} from './place.service';

@Controller('api/v1/place')
export class PlaceController {

  constructor(private placeService: PlaceService) {
  }

  @Get()
  async getAll() {
    return await this.placeService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.placeService.findById(id);
  }

  @Post()
  async create(@Body() place: any) {
    return await this.placeService.create(place);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() place: any) {
    return await this.placeService.update(id, place);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.placeService.delete(id);
  }
}
import {Controller, Get, Delete, Param, Post, Put, Body} from '@nestjs/common';
import {TransportService} from './transport.service';

@Controller('api/v1/transport')
export class TransportController {

  constructor(private transportService: TransportService) {
  }

  @Get()
  async getAll() {
    return await this.transportService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.transportService.findById(id);
  }

  @Post()
  async create(@Body() transport: any) {
    return await this.transportService.create(transport);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() transport: any) {
    return await this.transportService.update(id, transport);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.transportService.delete(id);
  }
}
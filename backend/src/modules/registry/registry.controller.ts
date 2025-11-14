import {Controller, Get, Delete, Param, Post, Put, Body} from '@nestjs/common';
import {RegistryService} from './registry.service';

@Controller('api/v1/registry')
export class RegistryController {

  constructor(private registryService: RegistryService) {
  }

  @Get()
  async getAll() {
    return await this.registryService.findAll();
  }

  @Post()
  async create(@Body() registry: any) {
    return await this.registryService.create(registry);
  }

}
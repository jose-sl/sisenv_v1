import {Controller, Get, Delete, Param, Post, Put, Body} from '@nestjs/common';
import {PackageService} from './package.service';

@Controller('api/v1/package')
export class PackageController {

  constructor(private packageService: PackageService) {
  }

  @Get()
  async getAll() {
    return await this.packageService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.packageService.findById(id);
  }

  @Post()
  async create(@Body() packages: any) {
    return await this.packageService.create(packages);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() packages: any) {
    return await this.packageService.update(id, packages);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.packageService.delete(id);
  }
}
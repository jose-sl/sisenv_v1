import {Controller, Get, Delete, Param, Post, Put, Body} from '@nestjs/common';
import {UserService} from './user.service';

@Controller('api/v1/user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Get('by_nic/:nic')
  async getByNic(@Param('nic') nic: string) {
    return await this.userService.findByNic(nic);
  }

  @Post()
  async create(@Body() user: any) {
    return await this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: any) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
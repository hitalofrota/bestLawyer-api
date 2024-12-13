import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema'
 
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAllUsers(): Promise<User[]>{
        return this.usersService.findAllUsers();
    }

    @Get('username/:username')
    async findUser(@Param('username') username: string): Promise<User | null> {
    return this.usersService.findByUsername(username);
    }

    @Get(':id')
    async findUserId(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findByUserid(id);
    }
    
    @Post()
    async createUser(
        @Body() body: {name: string; email: string; password: string}
    ): Promise<User> {
        return this.usersService.createUser(body.name, body.email, body.password)
    } 

    @Put(':id')
    async updateUser(
      @Param('id') id: string,
      @Body() body: { name: string; email: string },
    ): Promise<User> {
      return this.usersService.updateUser(id, body.name, body.email);
    }
  
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
      return this.usersService.deleteUser(id);
    }

}

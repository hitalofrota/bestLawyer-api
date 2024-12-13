import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './user.schema'
import { RegisterUserDto } from './register.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

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

    @Get('email/:email')
    async findUserByEmail(@Param('email') email: string): Promise<User | null> {
      return this.usersService.findByEmail(email);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async registerUser(@Body() body: RegisterUserDto) {
      const existingUser = await this.usersService.findByEmail(body.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
    
      const hashedPassword = await bcrypt.hash(body.password, 10);
      return this.usersService.createUser(body.name, body.email, hashedPassword);
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

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  create(createUserDto: CreateUserDto) {
    let test = this.prisma.user.create({ data: createUserDto });
    console.log(typeof test);
    return test;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique(
      { 
        where: { id },
        include: {
          profileLink: true
        }
      }
    );
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique(
      { 
        where: { "email": email },
        include: {
          profileLink: true
        }
      }
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({where: {id}, data: updateUserDto});
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

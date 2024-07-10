import { PickType } from '@nestjs/swagger';
import '@nestjs/common';
import { CreateUserDto } from '../../user/dto/user.dto';

export class SignDto extends PickType(CreateUserDto, [
  'phoneNumber',
  'password',
]) {}

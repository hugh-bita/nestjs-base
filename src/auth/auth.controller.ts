import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthTwitterGuard } from './strategies/twitter/twitter.guard';

@Controller('auth')
export class AuthController {
  constructor() {}
}

import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';

@Module({
  providers: [ResetService],
  controllers: [ResetController]
})
export class ResetModule {}

import { Module } from '@nestjs/common';
import { TgService } from './tg.service';

@Module({
  providers: [TgService]
})
export class TgModule {}

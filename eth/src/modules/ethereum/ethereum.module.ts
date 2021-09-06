import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { EthereumController } from './ethereum.controller';

@Module({
  imports: [HttpModule],
  providers: [EthereumService],
  controllers: [EthereumController],
})
export class EthereumModule {}

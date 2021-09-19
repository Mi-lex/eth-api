import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthereumService } from './ethereum.service';
import { EthereumController } from './ethereum.controller';
import Block from './entities/block.entity';
import Transaction from './entities/transaction.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Block, Transaction])],
  providers: [EthereumService],
  controllers: [EthereumController],
})
export class EthereumModule {}

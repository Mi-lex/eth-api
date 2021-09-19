import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { etherscan } from '../../config';
import { wait } from '../../common/helpers/time.helper';
import Block from './entities/block.entity';
import Transaction from './entities/transaction.entity';
import { IntervalBetweenCall } from './ethereum.decorators';

const ONE_SECOND_MS = 1000;
const REQUESTS_PER_SECOND_LIMIT = 5;
const REQUEST_INTERVAL = ONE_SECOND_MS / REQUESTS_PER_SECOND_LIMIT;

type EtherScanTransaction = {
  from: string;
  to: string;
  value: string;
};

type EtherScanBlockInfo = {
  number: string;
  transactions: EtherScanTransaction[];
};
@Injectable()
export class EthereumService {
  apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(etherscan.KEY)
    private readonly etherscanConfig: ConfigType<typeof etherscan>,
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
  ) {
    this.apiKey = this.etherscanConfig.API_KEY!;
    this.startWritingBlocks();
  }

  async getLastBlockHex() {
    const lastBlockResponse = await lastValueFrom(
      this.httpService.get(
        `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`,
      ),
    );

    return lastBlockResponse.data?.result || null;
  }

  async getBlockInfo(blockTag: string | number) {
    const blockInfoResponse = await lastValueFrom(
      this.httpService.get<{ result: EtherScanBlockInfo }>(
        `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockTag}&boolean=true&apikey=${this.apiKey}`,
      ),
    );

    return blockInfoResponse.data.result || null;
  }

  async storeBlock(blockData: EtherScanBlockInfo, blockSerialNumber: number) {
    const block = new Block();

    const transactions = blockData.transactions?.map((rawTransaction) => {
      const transaction = new Transaction();

      transaction.from = rawTransaction.from;
      transaction.to = rawTransaction.to;
      transaction.value = rawTransaction.value;

      return transaction;
    });

    block.serialNumber = blockSerialNumber;
    block.transactions = transactions;

    return this.blockRepository.save(block);
  }

  @IntervalBetweenCall(REQUEST_INTERVAL)
  async startWritingBlocks() {
    const lastBlock = await this.blockRepository
      .createQueryBuilder('blocks')
      .orderBy('id', 'DESC')
      .getOne();

    let lastIndex: number;

    if (lastBlock) {
      lastIndex = lastBlock.serialNumber;
    } else {
      await wait(REQUEST_INTERVAL);
      const lastBlockNumberInHex = await this.getLastBlockHex();

      if (!lastBlockNumberInHex) {
        return;
      }

      // if there is no stored block yet, start writing from lastBlockNumber - 100
      lastIndex = parseInt(lastBlockNumberInHex, 16) - 100;
    }
    const nextBlockNumber = lastIndex + 1;
    const nextBlockNumberInHex = nextBlockNumber.toString(16);

    await wait(REQUEST_INTERVAL);
    const blockInfo = await this.getBlockInfo(nextBlockNumberInHex);

    if (!blockInfo || parseInt(blockInfo.number, 16) === lastIndex) {
      return;
    }

    await this.storeBlock(blockInfo, nextBlockNumber);
  }
}

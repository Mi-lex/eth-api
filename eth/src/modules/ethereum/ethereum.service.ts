import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

const ONE_SECOND_MS = 1000;

type EtherScanTransaction = {
  from: string;
  to: string;
  value: string;
};

type EtherScanBlockInfoResponse = {
  result: {
    number: string;
    transactions: EtherScanTransaction;
  };
};


// добавить сервис EtherScan, в который можно поместить api методы
// Добавить private метод saveBlockInfo, который будет записывать блок информацию и транзацкии
// добавить метод getMostChangedWallet, который будет получать записи в дб и считать

@Injectable()
export class EthereumService {
  constructor(private readonly httpService: HttpService) {}

  async getLastBlockHex() {
    // !TODO handle rate limit error
    const lastBlockResponse = await lastValueFrom(
      this.httpService.get(
        'https://api.etherscan.io/api?module=proxy&action=eth_blockNumber',
      ),
    );

    return lastBlockResponse.data?.result || null;
  }

  async getBlockInfo(blockTag: string | number) {
    // !TODO handle rate limit error
    const blockInfoResponse = await lastValueFrom(
      this.httpService.get<EtherScanBlockInfoResponse>(
        `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockTag}&boolean=true`,
      ),
    );

    const bro = blockInfoResponse.data;
  }

  @Interval(ONE_SECOND_MS)
  writeBlocks() {
    console.log('every second Bop');
  }
}

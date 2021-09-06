import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

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
      this.httpService.get(
        `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockTag}&boolean=true`,
      ),
    );

    return blockInfoResponse.data;
  }
}

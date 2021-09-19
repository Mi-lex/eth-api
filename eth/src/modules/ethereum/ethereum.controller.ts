import { Controller, Get } from '@nestjs/common';
import { EthereumService } from './ethereum.service';

@Controller('ethereum')
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Get('/most-changed-wallet')
  getMostChangedWallet() {
    return this.ethereumService.getMostChangedWallet(100);
  }
}

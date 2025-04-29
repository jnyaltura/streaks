import { Controller, Get, Param } from '@nestjs/common';
import { StreaksService } from './streaks.service';

@Controller('streaks')
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get(':case')
  getStreak(@Param('case') caseName: string) {
    return this.streaksService.getStreaks(caseName);
  }
}

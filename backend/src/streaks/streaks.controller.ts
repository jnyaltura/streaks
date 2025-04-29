import { Controller, Get, Param } from '@nestjs/common';
import { StreaksService } from './streaks.service';

@Controller('streaks')
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get(':case')
  getStreak(@Param('case') caseName: string) {
    console.log("Case is API GET is called")
    return this.streaksService.getStreaks(caseName);
  }
}
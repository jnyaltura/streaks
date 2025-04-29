import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayState } from './streaks.constants';
import { Activity } from './entity/activity.entity';
import dayjs from 'dayjs';

@Injectable()
export class StreaksService {
  constructor(
    @InjectRepository(Activity)
    private activityRepo: Repository<Activity>,
  ) {}

  async getStreaks(caseName: string) {
    const today = dayjs();

    const allActivities = await this.activityRepo.find({
      where: { case: caseName },
    });

    // Build date -> activities[] map
    const activityMap = new Map<string, string[]>();
    allActivities.forEach(({ date, activities }) => {
      activityMap.set(date, activities);
    });

    const result: { date: string; activities: string[]; state: DayState }[] = [];

    let currentStreak = 0;
    let atRiskDays = 0;

    // Check the last 7 days starting from 6 days ago
    for (let offset = 6; offset >= 0; offset--) {
      const date = today.subtract(offset, 'day');
      const dateStr = date.format('YYYY-MM-DD');
      const activities = activityMap.get(dateStr) || [];
      const activityCount = activities.length;

      let state: DayState = 'INCOMPLETE';

      if (activityCount > 0) {
        if (atRiskDays === 0) {
          state = 'COMPLETED';
          currentStreak++;
        } else {
          const required = atRiskDays === 1 ? 2 : 3;
          if (activityCount >= required) {
            state = 'SAVED';
            currentStreak++;
            atRiskDays = 0;
          } else {
            state = 'INCOMPLETE';
            break; // streak broken
          }
        }
      } else {
        if (currentStreak > 0) {
          atRiskDays++;
          if (atRiskDays > 2) {
            break; // streak broken
          } else {
            state = 'AT_RISK';
          }
        }
      }

      result.push({ date: dateStr, activities, state });
    }

    // Fill remaining days (future) to maintain a 7-day array
    while (result.length < 7) {
      const futureDate = today.add(result.length, 'day').format('YYYY-MM-DD');
      result.push({ date: futureDate, activities: [], state: 'INCOMPLETE' });
    }

    return {
      case: caseName,
      total: currentStreak,
      dates: result,
    };
  }
}

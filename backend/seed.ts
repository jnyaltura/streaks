// seed.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Activity } from './src/streaks/entity/activity.entity';
import dayjs from 'dayjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const repo = app.get(getRepositoryToken(Activity));

  await repo.clear(); // optional: wipe existing data

  const now = dayjs();

  const seedData: Partial<Activity>[] = [
    // Case 1: 3 day recovery success
    { case: 'case1', date: now.subtract(3, 'day').format('YYYY-MM-DD'), activities: 1 },
    { case: 'case1', date: now.format('YYYY-MM-DD'), activities: 3 },

    // Case 2: 3 day recovery ongoing
    { case: 'case2', date: now.subtract(4, 'day').format('YYYY-MM-DD'), activities: 1 },
    { case: 'case2', date: now.subtract(3, 'day').format('YYYY-MM-DD'), activities: 1 },
    { case: 'case2', date: now.format('YYYY-MM-DD'), activities: 1 },

    // Case 3: 3 day recovery fail
    { case: 'case3', date: now.subtract(4, 'day').format('YYYY-MM-DD'), activities: 1 },
    { case: 'case3', date: now.subtract(1, 'day').format('YYYY-MM-DD'), activities: 3 },
  ];

  for (const item of seedData) {
    const activity = repo.create(item);
    await repo.save(activity);
  }

  console.log('✅ Seed data inserted.');
  await app.close();
}

bootstrap();

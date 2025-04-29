import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { Activity } from '../src/streaks/entity/activity.entity'; // adjust path if needed

let moduleRef: TestingModule;
let dataSource: DataSource;

/**
 * Called automatically before each test suite (via jest-e2e.json).
 * You can also call this manually inside individual tests if preferred.
 */
export async function streaksSetup(app: any) {
  dataSource = app.get(getDataSourceToken());

  // Drop and sync schema to ensure a clean DB
  await dataSource.synchronize(true);

  // Seed base data
  const activityRepo = dataSource.getRepository(Activity);

  await activityRepo.save([
    {
      date: '2024-02-23',
      activities: 2,
      case: 'case1',
    },
    {
      date: '2024-02-26',
      activities: 3,
      case: 'case1',
    },
    {
      date: '2024-02-24',
      activities: 0,
      case: 'case1',
    },
    {
      date: '2024-02-25',
      activities: 0,
      case: 'case1',
    },
    // Add more test activities as needed
  ]);
}

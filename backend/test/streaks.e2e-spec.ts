import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { streaksSetup } from './streaks.setup';

describe('StreaksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await streaksSetup(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/streaks/case1 (GET) should return valid streak data', async () => {
    const response = await request(app.getHttpServer())
      .get('/streaks/case1')
      .expect(200);

    expect(response.body).toHaveProperty('case', 'case1');
    expect(response.body).toHaveProperty('total');
    expect(Array.isArray(response.body.dates)).toBe(true);
  });

  it('/streaks/case2 (GET) should return 200 OK', async () => {
    await request(app.getHttpServer()).get('/streaks/case2').expect(200);
  });

  it('/streaks/invalid (GET) should return 404 or handle gracefully', async () => {
    await request(app.getHttpServer()).get('/streaks/invalid').expect(200); // or expect(404) if you throw NotFoundException
  });
});

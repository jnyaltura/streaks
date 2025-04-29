import { Module } from '@nestjs/common';
import { StreaksController } from './streaks.controller';
import { StreaksService } from './streaks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entity/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Activity],
      synchronize: true, // auto-create tables (disable in production)
    }),
    TypeOrmModule.forFeature([Activity]),
  ],
  controllers: [StreaksController],
  providers: [StreaksService],
})
export class StreaksModule {}
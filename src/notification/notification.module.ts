import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationController } from './notification.controller';
import { NotificationCommandHandler } from './notification.command-handler';
import { NotificationQueryHandler } from './notification.query-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationCommandHandler, NotificationQueryHandler],
})
export class NotificationModule { }

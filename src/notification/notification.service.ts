import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
    ) { }

    async update(id: number, updateNotificationDto: Partial<UpdateNotificationDto>): Promise<void> {
        await this.notificationRepository.update(id, updateNotificationDto);
    }

    async findOne(id: number): Promise<Notification> {
        return this.notificationRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.notificationRepository.delete(id);
    }

}
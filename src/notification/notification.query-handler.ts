import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationQueryHandler {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepo: Repository<Notification>,
    ) { }

    // Obtener todas las notificaciones
    async findAll(): Promise<Notification[]> {
        return await this.notificationRepo.find();
    }

    // Obtener una notificación por ID
    async findById(id: number): Promise<Notification> {
        const notification = await this.notificationRepo.findOne({ where: { id } });

        if (!notification) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }

        return notification;
    }
}

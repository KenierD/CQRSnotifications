import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationCommandHandler {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepo: Repository<Notification>,
    ) { }

    // Crear una notificación
    async createNotification(data: CreateNotificationDto): Promise<Notification> {
        const notification = this.notificationRepo.create(data);
        return await this.notificationRepo.save(notification);
    }

    // Actualizar una notificación por ID
    async updateNotification(
        id: number,
        data: UpdateNotificationDto,
    ): Promise<Notification> {
        const notification = await this.notificationRepo.findOne({ where: { id } });

        if (!notification) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }

        Object.assign(notification, data); // Actualizar los campos que recibimos
        return await this.notificationRepo.save(notification);
    }

    // Eliminar una notificación por ID
    async deleteNotification(id: number): Promise<void> {
        const result = await this.notificationRepo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }
    }
}

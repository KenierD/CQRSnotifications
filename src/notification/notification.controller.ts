import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotificationCommandHandler } from './notification.command-handler';
import { NotificationQueryHandler } from './notification.query-handler';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationController {
    constructor(
        private readonly commandHandler: NotificationCommandHandler,
        private readonly queryHandler: NotificationQueryHandler,
    ) { }

    @Get()
    async findAll() {
        return this.queryHandler.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.queryHandler.findById(id);
    }

    @Post()
    async create(@Body() createDto: CreateNotificationDto) {
        return this.commandHandler.createNotification(createDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateDto: UpdateNotificationDto,
    ) {
        return this.commandHandler.updateNotification(id, updateDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.commandHandler.deleteNotification(id);
    }
}

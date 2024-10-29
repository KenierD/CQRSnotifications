import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    codigo: string;

    @IsString()
    password: string;

    @IsString()
    email: string;

    @IsNumber()
    idCliente: number;

    @IsString()
    mensaje: string;

    @IsDate()
    fechaNotificacion: Date;

    @IsString()
    estado: string;

    @IsString()
    tipo: string;

    @IsString()
    prioridad: string;

    @IsString()
    link: string;
}
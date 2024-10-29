import { IsString, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class UpdateNotificationDto {
    @IsOptional()
    @IsString()
    codigo?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNumber()
    idCliente?: number;

    @IsOptional()
    @IsString()
    mensaje?: string;

    @IsOptional()
    @IsString()
    estado?: string;

    @IsOptional()
    @IsString()
    tipo?: string;

    @IsOptional()
    @IsString()
    prioridad?: string;

    @IsOptional()
    @IsString()
    link?: string;
}
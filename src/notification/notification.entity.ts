import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notificaciones')
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    idCliente: number;

    @Column()
    mensaje: string;

    @Column({ type: 'datetime' })
    fechaNotificacion: Date;

    @Column()
    estado: string;

    @Column()
    tipo: string;

    @Column()
    prioridad: string;

    @Column()
    link: string;
}
import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Card,
    CardContent,
    Button,
    Container,
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import axios from 'axios';

const NotificationView = () => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [formData, setFormData] = useState({
        codigo: '',
        password: '',
        email: '',
        idCliente: '',
        mensaje: '',
        fechaNotificacion: '',
        estado: '',
        tipo: '',
        prioridad: '',
        link: '',
    });

    // Cargar las notificaciones desde el backend
    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:3001/notifications');
            setNotifications(response.data);
        } catch (error) {
            console.error('Error al cargar las notificaciones:', error);
        }
    };

    const handleOpen = (notification = null) => {
        setSelectedNotification(notification);
        setFormData(notification || {
            codigo: '',
            password: '',
            email: '',
            idCliente: '',
            mensaje: '',
            fechaNotificacion: '',
            estado: '',
            tipo: '',
            prioridad: '',
            link: '',
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedNotification) {
                // Actualizar notificación
                await axios.put(`http://localhost:3001/notifications/${selectedNotification.id}`, formData);
            } else {
                // Crear nueva notificación
                await axios.post('http://localhost:3001/notifications', formData);
            }
            fetchNotifications();
            handleClose();
        } catch (error) {
            console.error('Error al guardar la notificación:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/notifications/${id}`);
            fetchNotifications();
        } catch (error) {
            console.error('Error al eliminar la notificación:', error);
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Notifications Dashboard
                    </Typography>
                    <Button color="inherit" onClick={() => handleOpen()}>
                        Add Notification
                    </Button>
                </Toolbar>
            </AppBar>

            <Container style={{ marginTop: '20px' }}>
                <Grid container spacing={3}>
                    {notifications.map((notification) => (
                        <Grid item xs={12} sm={6} md={4} key={notification.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{notification.mensaje}</Typography>
                                    <Typography color="text.secondary">Código: {notification.codigo}</Typography>
                                    <Typography color="text.secondary">Email: {notification.email}</Typography>
                                    <Typography color="text.secondary">ID Cliente: {notification.idCliente}</Typography>
                                    <Typography color="text.secondary">Estado: {notification.estado}</Typography>
                                    <Typography color="text.secondary">Tipo: {notification.tipo}</Typography>
                                    <Typography color="text.secondary">Prioridad: {notification.prioridad}</Typography>
                                    <Typography color="text.secondary">Fecha: {new Date(notification.fechaNotificacion).toLocaleString()}</Typography>
                                    <Typography color="text.secondary">Link: <a href={notification.link} target="_blank" rel="noopener noreferrer">{notification.link}</a></Typography>
                                </CardContent>
                                <Button size="small" color="primary" onClick={() => handleOpen(notification)}>
                                    Edit
                                </Button>
                                <Button size="small" color="secondary" onClick={() => handleDelete(notification.id)}>
                                    Delete
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedNotification ? 'Edit Notification' : 'Add Notification'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="mensaje"
                        label="Message"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.mensaje}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="codigo"
                        label="Código"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.codigo}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="idCliente"
                        label="ID Cliente"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={formData.idCliente}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="fechaNotificacion"
                        label="Fecha Notificación"
                        type="datetime-local"
                        fullWidth
                        variant="outlined"
                        value={formData.fechaNotificacion}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="estado"
                        label="Estado"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.estado}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="tipo"
                        label="Tipo"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.tipo}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="prioridad"
                        label="Prioridad"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.prioridad}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="link"
                        label="Link"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.link}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NotificationView;

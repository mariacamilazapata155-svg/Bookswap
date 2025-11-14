import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {

private notificaciones: any[] = [];
private mensajes: any[] = [];

constructor() {}

getNotificaciones() {
    return this.notificaciones;
}

addNotificacion(notificacion: any) {
    this.notificaciones.unshift({
        id: Date.now(),
        fecha: new Date(),
        ...notificacion,
    });

    localStorage.setItem('notificaciones', JSON.stringify(this.notificaciones));
}

agregarNotificacion(notificacion: any) {
    this.notificaciones.unshift(notificacion);
    localStorage.setItem('notificaciones', JSON.stringify(this.notificaciones));
}

getMensajes() {
    return this.mensajes;
}

agregarMensaje(mensaje: any) {
    this.mensajes.unshift({
        id: Date.now(),
        fecha: new Date(),
        ...mensaje,
    });
}
}


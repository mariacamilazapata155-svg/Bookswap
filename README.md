# 📚 BookSwap — Plataforma de Intercambio de Libros

Aplicación móvil desarrollada con **Ionic + Angular** para facilitar el intercambio de libros entre usuarios.  
Permite gestionar colecciones personales, enviar mensajes, recibir notificaciones y mantener un flujo simple entre lectores.

---

## Características principales

### 👤 Autenticación
- Registro de usuarios  
- Inicio y cierre de sesión  
- Persistencia de sesión mediante almacenamiento local  

### 📚 Gestión de Libros
- Agregar, editar y eliminar libros  
- Ver detalles  
- Solicitar intercambios  
- Historial de intercambios

### 🔔 Notificaciones
- Notificaciones cuando un usuario solicita intercambio  
- Listado persistente en localStorage  
- Visualización dinámica en Tab5

### 💬 Mensajes
- Envío de mensajes entre usuarios  
- Bandeja de mensajes con detalle  
- Campos: **destinatario**, **asunto**, **mensaje**  
- Persistencia de mensajes en localStorage

### 🎨 UI/UX
- Tema oscuro moderno  
- Componentes adaptados con SCSS  
- Formularios dinámicos e intuitivos  

***

# Tecnologías utilizadas

- **Ionic 7**  
- **Angular 17+**  
- **TypeScript**  
- **Ionic Storage / LocalStorage**  
- **SCSS**

---

# Estructura del proyecto

```bash
src/
 ├─ app/
 │   ├─ tabs/
 │   ├─ tab1/           # Mis Libros
 │   ├─ tab2/           # Detalle del Libro
 │   ├─ tab3/           # Intercambios
 │   ├─ tab4/           # Perfíl
 │   ├─ tab5/           # Mensajes & Notificaciones
 │   ├─ services/
 │   │   ├─ auth.service.ts
 │   │   ├─ storage.service.ts
 │   │   ├─ notification.service.ts
 │   │   ├─ mensajes.service.ts
 │   └─ pages/
 │       └─ detalle-libro/
 │           ├─ detalle-libro.page.ts
 │           ├─ detalle-libro.page.html
 │           └─ detalle-libro.page.scss
 ├─ assets/
 ├─ environments/
 └─ theme/
```

---

# Requisitos Previos

Asegúrate de tener instalado:

**Node.js (v18+)**
```bash
node -v
```

**Ionic CLI**
```bash
npm install -g @ionic/cli
```

**Angular CLI**
```bash
npm install -g @angular/cli
```


---
#  Instalación del proyecto

### Clonar el repositorio
```bash
git clone https://github.com/usuario/nombre-repositorio.git
```

### Instalar dependencias

```bash
cd nombre-repositorio
npm install
```

### Ejecutar en navegador
```bash
ionic serve
```

---

# 📱 Ejecutar en dispositivos móviles

### Android
```bash
ionic cap add android
ionic cap sync android
ionic cap open android
```

### iOS (solo en macOS)
```bash
ionic cap add ios
ionic cap sync ios
ionic cap open ios
```

---

# 🔧 Comandos útiles

| Acción                     | Comando             |
| -------------------------- | ------------------- |
| Iniciar servidor local     | `ionic serve`       |
| Construcción de producción | `ionic build`       |
| Sincronizar Capacitor      | `ionic cap sync`    |
| Construir app nativa       | `ionic cap build`   |
| Limpiar cachés             | `ionic cache clear` |

---

# Testing básico
```bash
npm run test
```

---
# Servicios principales

### AuthService

- Registro
- Login / Logout
- Gestión de sesión

### StorageService

- Abstracción del almacenamiento local

### NotificationService

- Manejo de notificaciones
- Persistencia local

### MensajesService

- Enviar y recibir mensajes
- Acceso al historial

---

# 🗄️ Datos guardados en localStorage

| Clave            | Descripción                        |
| ---------------- | ---------------------------------- |
| `user_data`      | Información del usuario registrado |
| `user_session`   | Sesión activa                      |
| `notificaciones` | Lista de notificaciones            |
| `mensajes`       | Historial de mensajes              |

---

# Navegación del proyecto

El proyecto usa un sistema de tabs:

- **Tab1:** Mis Libros
- **Tab2:** Detalle del Libro
- **Tab3:** Intercambios
- **Tab4:** Perfil
- **Tab5:** Mensajes & Notificaciones

---

# 👩‍💻 Autor

María Camila Areiza Zapata 
- Desarrolladora de Software

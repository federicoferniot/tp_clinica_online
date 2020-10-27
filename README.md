# TpClinicaOnline

<!-- Contenido -->
## Contenido

* [Acerca del proyecto](#acerca-del-proyecto)
* [Acerca de mi](#acerca-de-mi)
* [Cómo funciona](#cómo-funciona)
* - [Registro](#registro)
* - [Iniciar sesión](#iniciar-sesión)
* - [Acciones de usuarios](#acciones-de-usuarios)
## Acerca del proyecto

Este proyecto forma parte del trabajo práctico final para la materia Laboratorio IV

El proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8.

Está preparado para poder desplegarse en heroku. La versión actual puede encontrarse en el siguiente link. (https://ferniot-clinica-online.herokuapp.com/Login)


## Acerca de mi

Mi nombre es Ferniot Federico y soy alumno de la UTNFra. Actualmente estoy cursando materias para la carrera de TECNICATURA UNIVERSITARIA EN PROGRAMACIÓN
(http://www.sistemas-utnfra.com.ar/#/home)


## Cómo funciona

### Registro
El sistema presenta distintos perfiles de usuarios. El paciente, el profesional y el administrador.

Para poder empezar el usuario paciente o profesional debería registrarse en el sistema.

El usuario paciente debe completar con sus datos y dos imágenes, teniendo que validar su correo, una vez registrado, para poder ingresar al sistema.

![registro1](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/registro1.png)

El usuario profesional debe completar con sus datos personales y sus especialidades. Para poder ingresar al sistema, su usuario deberá ser autorizado por un administrador.

![registro2](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/registro2.png)

### Iniciar sesión

El usuario deberá ingresar sus credenciales y completar el captcha

![login](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/login.png)

### Acciones de usuarios

#### Administrador

El usuario administrador, al ingresar al sistema podrá autorizar usuarios profesionales y dar da alta nuevos administradores.

![autorizar](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/autorizar.png)

![adminalta](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/adminalta.png)

#### Paciente

El usuario paciente podrá solicitar turnos buscando por especialidad y también por el profesional disponible. El turno luego tendrá que ser aceptado por el profesional seleccionado.

![turnos](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/turnos.png)

También tendrá disponible un listado con sus turnos.

![misturnos](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/misturnos.png)

Y notificaciones correspondientes a sus turnos

![notificaciones](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/notificaciones.png)

#### Profesional

El usuario profesional podrá acceder a un listado con sus turnos para poder aceptarlos o rechazarlos. Y también para completar la reseña una vez atendido el paciente.

![misturnos2](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/misturnos2.png)

Y también tendrá la posibilidad de administrar sus horarios, como así también configurar la duración de sus consultas.

![horarios](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/horarios.png)

![duraciones](https://github.com/federicoferniot/tp_clinica_online/blob/main/screenshots/duraciones.png)
## Crear entidad
Enfoque a arquitectura por capas: 
Acceso de Datos ORM (1), Negocio (3,4), Presentacion ()
### 1. Crear Migracion: (la tabla en la BD) 
Definir campos de la entidad en la base de datos
``` bash
node ace make:migration <nombre de la migracion> (Plural)
```

### 2. Crear Modelo (La clase singular)
Se coloca cada uno de los atributos correspondientes y deben ir con el mismo nombre que se puso en la migracion
``` bash
    node ace make: model <nombre de la clase>
```

### 3. Crear Controlador (Plural)

``` bash
    node ace make:controller <nombre del controlador> //Simepre en plural
```

### 4. Definir Rutas
start/routes/theraters


### 5. Correr Migracion: 
Crear las tablas que aun no han sido creadas
``` bash
node ace migration:run
```

Elimina versiones de las tablas segun orden de creacion 
``` bash
    node ace migration:rollback
```
 
### Notas Clase: 
Creamos lo mismo con Projectors, dependencia entre ellos y referencia con fk, ademas de mirar que sonn los datos y funciones genericas

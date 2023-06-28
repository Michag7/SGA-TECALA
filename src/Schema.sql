

-- //Tabla Seccion
CREATE TABLE seccion
(
    sid integer PRIMARY KEY NOT NULL,
    s_nombre character varying(50) NOT NULL,
    s_descripcion character varying(200),
   
)

-- //Tabla Cuenta
create table cuenta(
cuenta_id serial primary key not null,
usuario varchar(20) not null,
contraseña varchar(50) not null
);


-- //Tabla Administrador
create table adminstrador(
	aid integer primary key not null,
	a_foto bytea,
	a_nombre varchar(50) not null,
	a_apellido varchar(50) not null,
	a_genero varchar(20) not null,
	a_telefono varchar(50) not null,
	a_email varchar(50) not null,
	a_ciudad varchar(20) not null,
	a_barrio varchar(20) not null,
	a_direccion varchar(50) not null,
	a_cuentaid integer not null,
	
	FOREIGN KEY (a_cuentaid) REFERENCES cuenta(cuenta_id)
	
);

-- //Tabla Docente
create table docente(
	did integer primary key not null,
	d_foto bytea,
	d_nombre varchar(50) not null,
	d_apellido varchar(50) not null,
	d_genero varchar(20) not null,
	d_telefono varchar(50) not null,
	d_email varchar(50) not null,
	d_ciudad varchar(20) not null,
	d_barrio varchar(20) not null,
	d_direccion varchar(50) not null,
	d_cuentaid integer not null,
	
	FOREIGN KEY (d_cuentaid) REFERENCES cuenta(cuenta_id)
	
);
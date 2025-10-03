create database control_usuarios;
use control_usuarios;

CREATE TABLE roles (
  id_rol INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE permisos (
  id_permiso INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  descripcion TEXT
);

CREATE TABLE rol_permiso (
  id_rol_permiso INT AUTO_INCREMENT PRIMARY KEY,
  id_rol INT,
  permiso_id INT,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
  FOREIGN KEY (permiso_id) REFERENCES permisos(id_permiso)
);

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(300),
  clave VARCHAR(500),
  id_rol INT,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- Insertar roles
INSERT INTO roles (nombre) VALUES
('administrador'),
('empleado');

-- Insertar permisos
INSERT INTO permisos (nombre, descripcion) VALUES
('crear', 'Permite crear nuevos registros'),
('leer', 'Permite visualizar registros'),
('actualizar', 'Permite modificar registros existentes'),
('eliminar', 'Permite eliminar registros');

-- Asignar permisos al rol administrador (id_rol = 1)
INSERT INTO rol_permiso (id_rol, permiso_id) VALUES
(1, 1), -- crear
(1, 2), -- leer
(1, 3), -- actualizar
(1,4); -- eliminar

-- Asignar permisos al rol empleado (id_rol = 2), solo leer
INSERT INTO rol_permiso (id_rol, permiso_id) VALUES
(2,2);

-- Insertar usuario Admin (contrasena: 123456)
INSERT INTO usuarios (nombre, email, clave, id_rol)
VALUES
('admin', 'admin@gmail.com', SHA2('1', 256), 1);
-- La contraseña es: 1

-- Insertar usuario Empleado (contrasena: 123456)
INSERT INTO usuarios (nombre, email, clave, id_rol)
VALUES
('empleado', 'empleado@gmail.com', SHA2('1', 256), 2);
-- La contraseña es: 1
/** 
 * Script de configuración de la BBDD de RUTPAM_Server
 * Este código funciona en los principales servidores SQL, está escrito siguiendo el estándar
 * Testeado en: MySQL, PosgreSQL
 *
 * @author Nestor Lora
 * @version 1
 */
 
DROP TABLE IF EXISTS redes;
DROP TABLE IF EXISTS tipo_linea_gtfs;
DROP TABLE IF EXISTS lineas;
DROP TABLE IF EXISTS operadores;
DROP TABLE IF EXISTS roles_operador;
DROP TABLE IF EXISTS operadores_lineas;
DROP TABLE IF EXISTS tipos_itinerario;
DROP TABLE IF EXISTS itinerarios;
DROP TABLE IF EXISTS trazados;
DROP TABLE IF EXISTS itinerarios_trazados;
DROP TABLE IF EXISTS zonas;
DROP TABLE IF EXISTS municipios;
DROP TABLE IF EXISTS nucleos;
DROP TABLE IF EXISTS estaciones;
DROP TABLE IF EXISTS paradas;
DROP TABLE IF EXISTS tipos_subida_bajada;
DROP TABLE IF EXISTS paradas_itinerario;
DROP TABLE IF EXISTS tipos_transbordo;
DROP TABLE IF EXISTS transbordos;
DROP TABLE IF EXISTS puntos;
DROP TABLE IF EXISTS puntos_trazado;
DROP TABLE IF EXISTS tipos_informacion;
DROP TABLE IF EXISTS informacion_operadores;
DROP TABLE IF EXISTS tipos_punto_venta;
DROP TABLE IF EXISTS puntos_venta;

CREATE TABLE IF NOT EXISTS redes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS tipo_linea_gtfs (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(50) NOT NULL,
  ejemplos VARCHAR(255) NULL
);
CREATE TABLE IF NOT EXISTS lineas (
  id SERIAL PRIMARY KEY,
  red INTEGER NOT NULL REFERENCES redes (id),
  eid VARCHAR(50) NULL,
  codigo VARCHAR(50) NULL,
  nombre VARCHAR(100) NOT NULL,
  observaciones VARCHAR(255) NULL,
  fecha_comienzo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_fin TIMESTAMP NULL,
  color VARCHAR(7) NULL,
  color_texto VARCHAR(7) NULL,
  url VARCHAR(255) NULL,
  tipo_gtfs INTEGER NOT NULL REFERENCES tipo_linea_gtfs (id)
);
CREATE TABLE IF NOT EXISTS operadores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(70) NOT NULL
);
CREATE TABLE IF NOT EXISTS roles_operador (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL 
);

CREATE TABLE IF NOT EXISTS operadores_lineas (
  id SERIAL PRIMARY KEY,
  linea INTEGER NOT NULL REFERENCES lineas (id),
  operador INTEGER NOT NULL REFERENCES operadores (id),
  rol INTEGER NOT NULL DEFAULT 1 REFERENCES roles_operador (id),
  fecha_comienzo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_fin TIMESTAMP NULL 
);
CREATE TABLE IF NOT EXISTS tipos_itinerario (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL
);
CREATE TABLE IF NOT EXISTS itinerarios (
  id SERIAL PRIMARY KEY,
  linea INTEGER NOT NULL REFERENCES lineas (id),
  eid VARCHAR(50) NULL,
  tipo INTEGER NOT NULL REFERENCES tipos_itinerario (id),
  destino VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) NULL,
  fecha_comienzo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_fin TIMESTAMP NULL 
);
CREATE TABLE IF NOT EXISTS trazados (
  id SERIAL PRIMARY KEY,
  color VARCHAR(7) NULL,
  transparencia DECIMAL(3,2) NULL
);
CREATE TABLE IF NOT EXISTS itinerarios_trazados (
  id SERIAL PRIMARY KEY,
  itinerario INTEGER NOT NULL REFERENCES itinerarios (id),
  trazado INTEGER NOT NULL REFERENCES trazados (id)
);
CREATE TABLE IF NOT EXISTS zonas (
  id SERIAL PRIMARY KEY,
  red INTEGER NOT NULL REFERENCES redes (id),
  nombre VARCHAR(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS municipios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS nucleos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  municipio INTEGER NOT NULL REFERENCES municipios (id)
);
CREATE TABLE IF NOT EXISTS estaciones (
  id SERIAL PRIMARY KEY,
  eid VARCHAR(50) NULL ,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(100) NULL,
  lat DECIMAL(10,6) NOT NULL,
  lon DECIMAL(10,6) NOT NULL
);
CREATE TABLE IF NOT EXISTS paradas (
  id SERIAL PRIMARY KEY,
  eid VARCHAR(50) NULL ,
  nombre VARCHAR(100) NOT NULL,
  nucleo INTEGER NULL  REFERENCES nucleos (id),
  estacion INTEGER NULL  REFERENCES estaciones (id),
  plataforma VARCHAR(10) NULL ,
  red INTEGER NOT NULL REFERENCES redes (id),
  zona INTEGER NULL REFERENCES zonas (id),
  direccion VARCHAR(100) NULL,
  lat DECIMAL(10,6) NOT NULL,
  lon DECIMAL(10,6) NOT NULL,
  fecha_comienzo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_fin TIMESTAMP NULL 
);
CREATE TABLE IF NOT EXISTS tipos_subida_bajada (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL 
);

CREATE TABLE IF NOT EXISTS paradas_itinerario (
  id SERIAL PRIMARY KEY,
  itinerario INTEGER NOT NULL REFERENCES itinerarios (id),
  parada INTEGER NOT NULL REFERENCES paradas (id),
  tipo_subida INTEGER NOT NULL DEFAULT 1 REFERENCES tipos_subida_bajada (id),
  tipo_bajada INTEGER NOT NULL DEFAULT 1 REFERENCES tipos_subida_bajada (id),
  orden INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS tipos_transbordo (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL
);
CREATE TABLE IF NOT EXISTS transbordos (
  id SERIAL PRIMARY KEY,
  parada1 INTEGER NOT NULL REFERENCES paradas (id),
  parada2 INTEGER NOT NULL REFERENCES paradas (id),
  tipo INTEGER NOT NULL DEFAULT 1 REFERENCES tipos_transbordo (id),
  tiempo_minimo INTEGER NULL
);
CREATE TABLE IF NOT EXISTS puntos (
  id SERIAL PRIMARY KEY,
  lat DECIMAL(10,6) NOT NULL,
  lon DECIMAL(10,6) NOT NULL
);
CREATE TABLE IF NOT EXISTS puntos_trazado (
  id SERIAL PRIMARY KEY,
  trazado INTEGER NOT NULL REFERENCES trazados (id),
  punto INTEGER NOT NULL REFERENCES puntos (id),
  orden INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS tipos_informacion (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS informacion_operadores (
  id SERIAL PRIMARY KEY,
  operador INTEGER NOT NULL REFERENCES operadores (id),
  tipo INTEGER NOT NULL REFERENCES tipos_informacion (id),
  informacion VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255) NULL 
);
CREATE TABLE IF NOT EXISTS tipos_punto_venta (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(40) NOT NULL
);
CREATE TABLE IF NOT EXISTS puntos_venta (
  id SERIAL PRIMARY KEY,
  operador INTEGER NOT NULL REFERENCES operadores (id),
  nucleo INTEGER NULL REFERENCES nucleos (id),
  tipo INTEGER NOT NULL REFERENCES tipos_punto_venta (id),
  direccion VARCHAR(100) NULL,
  lat DECIMAL(10,6) NOT NULL,
  lon DECIMAL(10,6) NOT NULL
);

INSERT INTO roles_operador (rol, descripcion) VALUES
('Operador','Por defecto, el rol habitual de un operador'),
('Regulación','El operador regula el cumplimiento de los horarios así como las situaciones especiales'),
('Operación de flota','El operador mantiene los vehículos y es responsable de los conductores'),
('Planificación','Modificaciones del recorrido y los horarios'),
('Billetaje','Gestión del sistema de títulos y abonos de viaje'),
('Otro','Otros roles');
INSERT INTO tipos_itinerario (tipo, descripcion) VALUES
('Ida',''),
('Vuelta',''),
('Circular','La línea tiene solo un sentido'),
('Posicionamiento','Movimientos de vehículos sin pasajeros'),
('Desconocido','No hay información disponible');
INSERT INTO tipos_subida_bajada (tipo, descripcion) VALUES
('Desconocido','No hay información sobre el tipo de parada'),
('Programada','El vehículo tiene programada la parada'),
('No disponible','La parada no está disponible'),
('Concertada','Es necesario avisar a la empresa para realizar la parada'),
('Avisar conductor','Es necesario avisar al conductor para realizar la parada'),
('Obligatoria','Es obligatorio bajar del vehículo');
INSERT INTO tipos_transbordo (tipo, descripcion) VALUES
('Defecto','No hay información disponible sobre el tipo de transbordo'),
('Recomendado','Se puede y se recomienda realizar este transbordo'),
('Programado','El vehículo espera a los viajeros que van a transbordar'),
('Necesita tiempo','Se puede transbordar siempre que se haya un tiempo mínimo antes de la salida'),
('Prohibido','No está permitido este transbordo');
INSERT INTO tipos_transbordo (tipo) VALUES
('Teléfono'),('Dirección'),('Correo electrónico'),('URL'),('Ubicación'),('Nombre alternativo');
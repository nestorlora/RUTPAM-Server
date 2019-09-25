/** 
 * Basic DB setup script
 * This script works on all major sql servers, it was writed following the sql standard
 * Tested in: MySQL, PosgreSQL
 *
 * @author Nestor Lora
 * @version 3
 */
 
DROP TABLE IF EXISTS networks;
DROP TABLE IF EXISTS route_types;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS agencies;
DROP TABLE IF EXISTS agency_roles;
DROP TABLE IF EXISTS routes_agencies;
DROP TABLE IF EXISTS subroute_types;
DROP TABLE IF EXISTS subroutes;
DROP TABLE IF EXISTS paths;
DROP TABLE IF EXISTS zones;
DROP TABLE IF EXISTS towns;
DROP TABLE IF EXISTS town_areas;
DROP TABLE IF EXISTS stations;
DROP TABLE IF EXISTS stops;
DROP TABLE IF EXISTS pickup_dropoff_types;
DROP TABLE IF EXISTS subroute_stops;
DROP TABLE IF EXISTS tranfer_types;
DROP TABLE IF EXISTS transfers;
DROP TABLE IF EXISTS points;
DROP TABLE IF EXISTS path_points;
DROP TABLE IF EXISTS info_types;
DROP TABLE IF EXISTS agencies_info;
DROP TABLE IF EXISTS pos_types;
DROP TABLE IF EXISTS pos;

CREATE TABLE IF NOT EXISTS networks (
  id SERIAL PRIMARY KEY,
  short_name VARCHAR(50) NULL,
  long_name VARCHAR(100) NULL
);
CREATE TABLE IF NOT EXISTS route_types (
  id SERIAL PRIMARY KEY,
  description VARCHAR(50) NOT NULL,
  example VARCHAR(255) NULL
);
CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  network INTEGER NOT NULL REFERENCES networks (id),
  eid VARCHAR(50) NULL,
  short_name VARCHAR(50) NULL,
  long_name VARCHAR(100) NOT NULL,
  observations VARCHAR(255) NULL,
  start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP NULL,
  color VARCHAR(7) NULL,
  text_color VARCHAR(7) NULL,
  url VARCHAR(255) NULL,
  type INTEGER NOT NULL REFERENCES route_types (id)
);
CREATE TABLE IF NOT EXISTS agencies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(70) NOT NULL
);
CREATE TABLE IF NOT EXISTS agency_roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL 
);

CREATE TABLE IF NOT EXISTS routes_agencies (
  id SERIAL PRIMARY KEY,
  route INTEGER NOT NULL REFERENCES routes (id),
  agency INTEGER NOT NULL REFERENCES agencies (id),
  role INTEGER NOT NULL DEFAULT 1 REFERENCES agency_roles (id),
  start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP NULL 
);
CREATE TABLE IF NOT EXISTS subroute_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL
);
CREATE TABLE IF NOT EXISTS paths (
  id SERIAL PRIMARY KEY,
  color VARCHAR(7) NULL,
  transparency DECIMAL(3,2) NULL
);
CREATE TABLE IF NOT EXISTS subroutes (
  id SERIAL PRIMARY KEY,
  route INTEGER NOT NULL REFERENCES routes (id),
  eid VARCHAR(50) NULL,
  type INTEGER NOT NULL REFERENCES subroute_types (id),
  headsign VARCHAR(100) NOT NULL,
  path INTEGER NULL REFERENCES paths (id),
  description VARCHAR(255) NULL,
  start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP NULL 
);
CREATE TABLE IF NOT EXISTS zones (
  id SERIAL PRIMARY KEY,
  network INTEGER NOT NULL REFERENCES networks (id),
  name VARCHAR(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS towns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS town_areas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  area INTEGER NOT NULL REFERENCES towns (id)
);
CREATE TABLE IF NOT EXISTS stations (
  id SERIAL PRIMARY KEY,
  eid VARCHAR(50) NULL ,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NULL,
  lat DECIMAL(10,6) NOT NULL,
  lon DECIMAL(10,6) NOT NULL
);
CREATE TABLE IF NOT EXISTS stops (
  id SERIAL PRIMARY KEY,
  eid VARCHAR(50) NULL ,
  name VARCHAR(100) NOT NULL,
  area INTEGER NULL  REFERENCES town_areas (id),
  station INTEGER NULL  REFERENCES stations (id),
  platform VARCHAR(10) NULL ,
  network INTEGER NOT NULL REFERENCES networks (id),
  zone INTEGER NULL REFERENCES zones (id),
  address VARCHAR(100) NULL,
  lat DECIMAL(10,6) NOT NULL,
  lon DECIMAL(10,6) NOT NULL,
  start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP NULL 
);
CREATE TABLE IF NOT EXISTS pickup_dropoff_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL 
);

CREATE TABLE IF NOT EXISTS subroute_stops (
  id SERIAL PRIMARY KEY,
  subroute INTEGER NOT NULL REFERENCES subroutes (id),
  stop INTEGER NOT NULL REFERENCES stops (id),
  pickup_type INTEGER NOT NULL DEFAULT 1 REFERENCES pickup_dropoff_types (id),
  dropoff_type INTEGER NOT NULL DEFAULT 1 REFERENCES pickup_dropoff_types (id),
  sequence INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS tranfer_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL
);
CREATE TABLE IF NOT EXISTS transfers (
  id SERIAL PRIMARY KEY,
  stop1 INTEGER NOT NULL REFERENCES stops (id),
  stop2 INTEGER NOT NULL REFERENCES stops (id),
  type INTEGER NOT NULL DEFAULT 1 REFERENCES tranfer_types (id),
  minimun_time INTEGER NULL
);
CREATE TABLE IF NOT EXISTS points (
  id SERIAL PRIMARY KEY,
  lat DECIMAL(10,6) NOT NULL,
  lon DECIMAL(10,6) NOT NULL
);
CREATE TABLE IF NOT EXISTS path_points (
  id SERIAL PRIMARY KEY,
  path INTEGER NOT NULL REFERENCES paths (id),
  pnt INTEGER NOT NULL REFERENCES points (id),
  sequence INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS info_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS agencies_info (
  id SERIAL PRIMARY KEY,
  agency INTEGER NOT NULL REFERENCES agencies (id),
  type INTEGER NOT NULL REFERENCES info_types (id),
  information VARCHAR(255) NOT NULL,
  description VARCHAR(255) NULL 
);
CREATE TABLE IF NOT EXISTS pos_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(40) NOT NULL
);
CREATE TABLE IF NOT EXISTS pos (
  id SERIAL PRIMARY KEY,
  agency INTEGER NOT NULL REFERENCES agencies (id),
  area INTEGER NULL REFERENCES town_areas (id),
  type INTEGER NOT NULL REFERENCES pos_types (id),
  address VARCHAR(100) NULL,
  lat DECIMAL(10,6) NOT NULL,
  lon DECIMAL(10,6) NOT NULL
);

INSERT INTO agency_roles (role, description) VALUES
('Operador','Por defecto, el role habitual de un agency'),
('Regulación','El agency regula el cumplimiento de los horarios así como las situaciones especiales'),
('Operación de flota','El agency mantiene los vehículos y es responsable de los conductores'),
('Planificación','Modificaciones del recorrido y los horarios'),
('Billetaje','Gestión del sistema de títulos y abonos de viaje'),
('Otro','Otros roles');
INSERT INTO subroute_types (type, description) VALUES
('Ida',''),
('Vuelta',''),
('Circular','La línea tiene solo un sentido'),
('Posicionamiento','Movimientos de vehículos sin pasajeros'),
('Desconocido','No hay información disponible');
INSERT INTO pickup_dropoff_types (type, description) VALUES
('Desconocido','No hay información sobre el type de parada'),
('Programada','El vehículo tiene programada la parada'),
('No disponible','La parada no está disponible'),
('Concertada','Es necesario avisar a la empresa para realizar la parada'),
('Avisar conductor','Es necesario avisar al conductor para realizar la parada'),
('Obligatoria','Es obligatorio bajar del vehículo');
INSERT INTO tranfer_types (type, description) VALUES
('Defecto','No hay información disponible sobre el type de transbordo'),
('Recomendado','Se puede y se recomienda realizar este transbordo'),
('Programado','El vehículo espera a los viajeros que van a transbordar'),
('Necesita tiempo','Se puede transbordar siempre que se haya un tiempo mínimo antes de la salida'),
('Prohibido','No está permitido este transbordo');
INSERT INTO info_types (type) VALUES
('Teléfono'),('Dirección'),('Correo electrónico'),('URL'),('Ubicación'),('name alternativo');
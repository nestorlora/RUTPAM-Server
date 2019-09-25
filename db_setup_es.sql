/** 
 * Spanish DB completion script
 * This script inserts some temaplate information into de DB
 * This script works on all major sql servers, it was writed following the sql standard
 * Tested in: MySQL, PosgreSQL
 *
 * @author Nestor Lora
 * @version 3
 */

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

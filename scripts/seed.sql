INSERT INTO categorias(nombre)
VALUES
('Acción'),
('RPG'),
('Aventura'),
('Deportes'),
('Carreras'),
('Estrategia'),
('Terror'),
('Shooter'),
('Indie'),
('Simulación');

INSERT INTO desarrolladores(nombre,pais)
VALUES
('Rockstar Games','Estados Unidos'),
('Ubisoft','Francia'),
('EA Sports','Estados Unidos'),
('Valve','Estados Unidos'),
('Capcom','Japón'),
('Konami','Japón'),
('Nintendo','Japón'),
('Bethesda','Estados Unidos'),
('CD Projekt','Polonia'),
('Square Enix','Japón');

INSERT INTO juegos
(titulo, precio, stock, categoria_id, desarrollador_id)

SELECT
'Juego ' || g,
(random()*280+20)::numeric(10,2),
(random()*100+1)::int,
floor(random()*10 + 1)::int,
floor(random()*10 + 1)::int

FROM generate_series(1,1000) g;

INSERT INTO clientes
(nombre, correo)

SELECT
'Cliente ' || g,
'cliente' || g || '@gamestore.com'

FROM generate_series(1,5000) g;

INSERT INTO ventas
(cliente_id, fecha, total)

SELECT
floor(random()*5000 + 1)::int,
NOW() - (random() * interval '365 days'),
(random()*500+20)::numeric(10,2)

FROM generate_series(1,50000);

INSERT INTO detalle_ventas
(venta_id, juego_id, cantidad, subtotal)

SELECT
floor(random()*50000 + 1)::int,
floor(random()*1000 + 1)::int,
floor(random()*5 + 1)::int,
(random()*300+20)::numeric(10,2)

FROM generate_series(1,150000);

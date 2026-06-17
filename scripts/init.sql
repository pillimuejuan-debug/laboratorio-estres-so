CREATE TABLE categorias(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE desarrolladores(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(80)
);

CREATE TABLE juegos(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    desarrollador_id INTEGER NOT NULL,

    CONSTRAINT fk_categoria
        FOREIGN KEY(categoria_id)
        REFERENCES categorias(id),

    CONSTRAINT fk_desarrollador
        FOREIGN KEY(desarrollador_id)
        REFERENCES desarrolladores(id)
);

CREATE TABLE clientes(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE ventas(
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),

    CONSTRAINT fk_cliente
        FOREIGN KEY(cliente_id)
        REFERENCES clientes(id)
);

CREATE TABLE detalle_ventas(
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL,
    juego_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    subtotal DECIMAL(10,2),

    CONSTRAINT fk_venta
        FOREIGN KEY(venta_id)
        REFERENCES ventas(id),

    CONSTRAINT fk_juego
        FOREIGN KEY(juego_id)
        REFERENCES juegos(id)
);

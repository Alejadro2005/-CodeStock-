-- DDL (CREATE TABLE statements)

CREATE TABLE usuarios (
                id SERIAL PRIMARY KEY,
                nombre TEXT NOT NULL,
                rol TEXT NOT NULL,
                password TEXT NOT NULL,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

CREATE TABLE productos (
                id SERIAL PRIMARY KEY,
                nombre TEXT NOT NULL,
                precio REAL NOT NULL,
                cantidad INTEGER NOT NULL,
                categoria TEXT NOT NULL,
                stock_minimo INTEGER NOT NULL,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

CREATE TABLE ventas (
                id SERIAL PRIMARY KEY,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                id_usuario INTEGER,
                total REAL NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
            );

CREATE TABLE detalle_ventas (
                venta_id INTEGER,
                producto_id INTEGER,
                cantidad INTEGER NOT NULL,
                precio REAL NOT NULL,
                PRIMARY KEY (venta_id, producto_id),
                FOREIGN KEY (venta_id) REFERENCES ventas (id),
                FOREIGN KEY (producto_id) REFERENCES productos (id)
            );

-- INSERT statements


INSERT INTO usuarios (id, nombre, rol, password, fecha_creacion) VALUES (1, 'Admin', 'admin', 'admin123', '2025-05-09 19:14:14');
INSERT INTO usuarios (id, nombre, rol, password, fecha_creacion) VALUES (2, 'empleado', 'empleado', 'emp123', '2025-05-09 19:14:14');


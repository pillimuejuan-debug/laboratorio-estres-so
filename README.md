# WSL2 / Docker Stress Laboratory

## Integrantes

* Juan Pablo Pillimue-2477332
* Juan Diego Montaño - 2477334

## Descripción

Este proyecto implementa un laboratorio de estrés para sistemas basado en Docker, WSL2, Next.js y PostgreSQL. La aplicación permite generar diferentes tipos de carga sobre los recursos del sistema con el objetivo de analizar su comportamiento bajo condiciones de alta demanda.

## Tecnologías utilizadas

* WSL2
* Docker
* Docker Compose
* Next.js 14
* TypeScript
* PostgreSQL 15
* Python/Jupyter Notebook
* Linux Monitoring Tools

## Arquitectura

El sistema está compuesto por dos contenedores principales:

### stress-nextjs

Aplicación web encargada de:

* Generar cargas de estrés.
* Mostrar métricas en tiempo real.
* Registrar el historial de pruebas.

### stress-postgres

Base de datos PostgreSQL utilizada para:

* Almacenamiento de información.
* Ejecución de consultas intensivas.
* Generación de carga sobre el motor de base de datos.

## Mecanismos de carga implementados

### CPU Stress

Genera cálculos intensivos para aumentar el uso del procesador.

### RAM Stress

Realiza asignaciones de memoria para incrementar el consumo de RAM.

### DB Stress

Ejecuta consultas repetitivas sobre PostgreSQL.

### I/O Stress

Genera operaciones intensivas de lectura y escritura.

### Mix Stress

Combina CPU, RAM, I/O y Base de Datos simultáneamente.

## Telemetría

La aplicación muestra:

* Uso de CPU.
* Consumo de memoria RAM.
* Conexiones activas a PostgreSQL.
* Historial de cargas ejecutadas.

## Ejecución

### Levantar contenedores

docker compose up -d

### Verificar servicios

docker ps

### Abrir aplicación

http://localhost:3000

## Monitoreo

Durante las pruebas se utilizaron:

* htop
* docker stats
* vmstat
* pg_stat_activity

## Actividad de Inteligencia Artificial

Se ejecutó un notebook de entrenamiento de IA de manera simultánea con los generadores de carga para observar la competencia por recursos del sistema.

## Resultados

Las pruebas permitieron identificar el comportamiento de CPU, memoria y base de datos bajo distintos escenarios de estrés, así como evaluar estrategias de optimización mediante control de procesos y prioridades.

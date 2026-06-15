-- Script para agregar observaciones al turno de reservas
-- Ejecutar sobre la base de datos

ALTER TABLE turnos_reservas
  ADD COLUMN observaciones TEXT NULL AFTER valor_total;

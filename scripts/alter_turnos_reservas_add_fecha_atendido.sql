-- Script para agregar la fecha de atención al historial de turnos
-- Ejecutar sobre la base de datos prog3_turnos

ALTER TABLE turnos_reservas
  ADD COLUMN fecha_atendido DATETIME NULL AFTER atentido;

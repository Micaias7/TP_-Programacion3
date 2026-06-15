ALTER TABLE usuarios
  ADD COLUMN reset_token VARCHAR(255) NULL,
  ADD COLUMN reset_token_expiration DATETIME NULL;

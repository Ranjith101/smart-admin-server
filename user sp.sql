DELIMITER //

CREATE PROCEDURE sp_save_user (
    IN p_id INT,
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_role VARCHAR(50)
)
BEGIN
    IF p_id IS NULL OR p_id = 0 THEN
        INSERT INTO users (username, password, role)
        VALUES (p_username, p_password, p_role);
    ELSE
        UPDATE users
        SET username = p_username,
            password = p_password,
            role = p_role,
            updatedAt = CURRENT_TIMESTAMP
        WHERE id = p_id;
    END IF;
END //

DELIMITER ;

CREATE TABLE IF NOT EXISTS form_config (
  id INT AUTO_INCREMENT PRIMARY KEY,
  form_name VARCHAR(100),          -- e.g., 'user'
  field_name VARCHAR(100),         -- e.g., 'username'
  label VARCHAR(100),              -- e.g., 'Username'
  type VARCHAR(50),                -- e.g., 'text', 'password', 'select'
  required BOOLEAN DEFAULT FALSE,
  default_value VARCHAR(255),
  options TEXT,                    -- JSON string for dropdown options
  `order` INT
);



INSERT INTO form_config (form_name, field_name, label, type, required, `order`, default_value, options)
VALUES 
  ('user', 'username', 'Username', 'text', TRUE, 1, NULL, NULL),
  ('user', 'password', 'Password', 'password', TRUE, 2, NULL, NULL),
  ('user', 'role', 'Role', 'select', TRUE, 3, 'user', '["user","admin"]');

select * from form_config

SELECT * FROM form_config WHERE form_name = 'user';

SELECT *
FROM form_config
WHERE form_name = 'user'
ORDER BY field_name, `order`;


DELETE fc1
FROM form_config fc1
JOIN form_config fc2
  ON fc1.form_name = fc2.form_name
  AND fc1.field_name = fc2.field_name
  AND fc1.label = fc2.label
  AND fc1.type = fc2.type
  AND fc1.required = fc2.required
  AND fc1.`order` = fc2.`order`
  AND fc1.ROWID > fc2.ROWID; -- MySQL 8+: Use ctids/ROWID or create surrogate key
DELETE FROM form_config
WHERE id IN (3, 4);
select * from form_config

select * from users


export const CreateUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(5000) NOT NULL,
    acc_created TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    shard key (id)
)`

export const SignUpQuery = `INSERT INTO users(
name,
email,
password
) values(?,?,?)`

export const LoginQuery = `SELECT name, email FROM users WHERE email = ?`

export const VerifyPasswordQuery = `SELECT password FROM users WHERE email = ?`

export const ExistingUserQuery = `SELECT * FROM users WHERE email = ?`


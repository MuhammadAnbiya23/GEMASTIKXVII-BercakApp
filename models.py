from app import db, bcrypt

class DataUser:
    @staticmethod
    def create_user(name, email, password):
        cursor = db.connection.cursor()
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", 
                       (name, email, hashed_password))
        db.connection.commit()
        cursor.close()

    @staticmethod
    def get_user_by_email(email):
        cursor = db.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        return user

    @staticmethod
    def check_password(stored_password, provided_password):
        return bcrypt.check_password_hash(stored_password, provided_password)

from app import db, bcrypt
from werkzeug.security import generate_password_hash, check_password_hash

class DataUser:
    @staticmethod
    def create_user(name, email, password):
        cursor = db.connection.cursor()
        try:
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            cursor.execute("INSERT INTO data_users (name, email, password) VALUES (%s, %s, %s)", 
                           (name, email, hashed_password))
            db.connection.commit()
            print(f"User {name} created successfully.")
        except Exception as e:
            print(f"Error: {e}")
            db.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def get_user_by_email(email):
        cursor = db.connection.cursor()
        try:
            cursor.execute("SELECT * FROM data_users WHERE email = %s", (email,))
            user = cursor.fetchone()
            print(f"Fetched user: {user}")
            return user
        except Exception as e:
            print(f"Error: {e}")
            return None
        finally:
            cursor.close()

    @staticmethod
    def check_password(stored_password, provided_password):
        return bcrypt.check_password_hash(stored_password, provided_password)
 


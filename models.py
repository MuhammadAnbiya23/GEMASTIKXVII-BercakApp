from app import db, bcrypt
from werkzeug.security import generate_password_hash, check_password_hash

class DataUser:
    @staticmethod
    def create_user(name, email, password):
        cursor = db.connection.cursor()
        try:
            # hashed_password = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8') 
            # hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            cursor.execute("INSERT INTO data_user (name, email, password) VALUES (%s, %s, %s)", 
                           (name, email, password))# hashed_password))
            db.connection.commit()
            print(f"User {name} created successfully.")  # Debugging statement
        except Exception as e:
            print(f"Error: {e}")
            db.connection.rollback()
        finally:
            cursor.close()

    @staticmethod
    def get_user_by_email(email):
        cursor = db.connection.cursor()
        try:
            cursor.execute("SELECT * FROM data_user WHERE email = %s", (email,))
            user = cursor.fetchone()
            print(f"Fetched user: {user}")  # Debugging statement
            return user
        except Exception as e:
            print(f"Error: {e}")
            return None
        finally:
            cursor.close()

    @staticmethod
    def get_hashed_password(email):
        cursor = db.connection.cursor()
        try:
            cursor.execute("SELECT password FROM data_user WHERE email = %s", (email,))
            hashed_password = cursor.fetchone()
            if hashed_password:
                return hashed_password[0]
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
            return None
        finally:
            cursor.close()

    @staticmethod
    def check_password(stored_password, provided_password):
        return bcrypt.check_password_hash(stored_password, provided_password)
    # def check_password(password) :
        # hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
        # return bcrypt.checkpw(password, hashed_password)


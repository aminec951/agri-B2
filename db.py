import mysql.connector

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="agri_user",
        password="MotDePasseSecurise123!",
        database="agri"
    )

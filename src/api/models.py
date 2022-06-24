from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Datos de usuarios
class User(db.Model):

@classmethod
    def create(cls, data):
        try:
            new_user = cls(**data)
            db.session.add(new_user)
            db.session.commit()
            return new_user
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    lastname = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    identification = db.Column(db.String(120), unique=True, nullable=False)
    nationality = db.Column(db.String(120), unique=True, nullable=False)
    birthday = db.Column(db.DateTime, unique=False, nullable=False)
    # attached_file = db.Column(db.XXXXXX, unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    reputation = db.Column(db.Float, unique=True, nullable=False)
    completed_trades = db.Column(db.Integer, unique=True, nullable=False)
    # Añadir relación con "historial de transacciones" (dos usuarios por transacción - relación varios a uno)
    # Añadir relación con "compra" (dos usuarios por transacción - relación uno a varios)
    # Añadir relación con "venta" (dos usuarios por transacción - relación uno a varios)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    # Se va a permitir que el usuario actualice sus datos?
    # Cómo actualiza los datos si se rechaza la verificación? Se registra nuevamente?
    # Qué datos podra actualizar?

    # def update(self, new_name, new_lastname, new_username, new_nationality):
    #     self.date = new_name
    #     self.date = new_lastname
    #     self.date = new_username    
    #     self.date = new_nationality 
    #     db.session.commit()
    #     return True



# Transacción de compra
class Buypublications(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exchange_rate = db.Column(db.Float, unique=True, nullable=False)
    balance = db.Column(db.Float, unique=True, nullable=False)
    message = db.Column(db.String(280), unique=True, nullable=False)
    # preferred_banks puede provenir de una lista desplegable?
    # preferred_banks = 
    # 3 status = [open, filled, canceled]
    status = db.Column(db.String(120), unique=True, nullable=False)
    # Añadir relación con usuario que compra
    # Añadir relación con usuario que vende
    # Añadir relación con operaciones de compra
    # Añadir relación con historial de publicaciones
    # Añadir relación con historial de operaciones?

    def update(self, new_exchange_rate, new_balance, new_message, new_preferred_banks):
        self.exchange_rate = new_exchange_rate
        self.balance = new_balance
        self.message = new_message
        self.preferred_banks = new_preferred_banks
        db.session.commit()
        return True

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return True

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "api_id": self.api_id
        }




# Transacción de venta
class Sellpublications(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exchange_rate = db.Column(db.Float, unique=True, nullable=False)
    balance = db.Column(db.Float, unique=True, nullable=False)
    message = db.Column(db.String(280), unique=True, nullable=False)
    # preferred_banks puede provenir de una lista desplegable?
    # preferred_banks = 
    # 3 status = [open, filled, canceled]
    status = db.Column(db.String(120), unique=True, nullable=False)
    # Añadir relación con usuario que compra
    # Añadir relación con usuario que vende
    # Añadir relación con operaciones de compra
    # Añadir relación con historial de publicaciones
    # Añadir relación con historial de operaciones?

    def update(self, new_exchange_rate, new_balance, new_message, new_preferred_banks):
        self.exchange_rate = new_exchange_rate
        self.balance = new_balance
        self.message = new_message
        self.preferred_banks = new_preferred_banks
        db.session.commit()
        return True

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return True

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "api_id": self.api_id
        }




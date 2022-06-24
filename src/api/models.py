from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Datos de usuarios
class User(db.Model):
    # Registro
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    lastname = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # Verificación
    birthday = db.Column(db.DateTime, unique=False, nullable=False)
    identification = db.Column(db.String(120), unique=True, nullable=False)
    nationality = db.Column(db.String(120), unique=True, nullable=False)
    # attached_file = db.Column(db.XXXXXX, unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    # Funcionamiento
    reputation = db.Column(db.Float, unique=True, nullable=False)
    completed_trades = db.Column(db.Integer, unique=True, nullable=False)
    score = db.Column(db.Integer, unique=True, nullable=False)
    # Añadir relación con "historial de transacciones" (dos usuarios por transacción - relación varios a uno)
    # Añadir relación con "compra" (dos usuarios por transacción - relación uno a varios)
    # Añadir relación con "venta" (dos usuarios por transacción - relación uno a varios)

    def __repr__(self):
        return f'<User {self.email}>'

    # def create(self):
    #     try:
    #         db.session.add(self)
    #         db.session.commit()
    #         return True
    #     except:
    #         db.session.rollback()
    #         print('An error has ocurred')
    #         return False
    
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

    # Se va a permitir que el usuario actualice sus datos?
    # Cómo actualiza los datos si se rechaza la verificación?
    # Qué datos podra actualizar?

    # def update(self, new_name, new_lastname, new_username, new_nationality):
    #     self.date = new_name
    #     self.date = new_lastname
    #     self.date = new_username    
    #     self.date = new_nationality 
    #     db.session.commit()
    #     return True

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }





# Transacción de compra
class Buypublications(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, unique=False, nullable=False)
    exchange_rate = db.Column(db.Float, unique=True, nullable=False)
    balance = db.Column(db.Float, unique=True, nullable=False)
    message = db.Column(db.String(280), unique=True, nullable=False)
    # preferred_banks puede provenir de una lista desplegable?
    # preferred_banks = 
    # 4 status = [open, trading, filled, canceled]
    status = db.Column(db.String(120), unique=True, nullable=False)
    # Añadir relación con usuario que compra
    # Añadir relación con usuario que vende
    # Añadir relación con historial de operaciones

    def update(self, new_exchange_rate, new_balance, new_message, new_preferred_banks):
        self.exchange_rate = new_exchange_rate
        self.balance = new_balance
        self.message = new_message
        self.preferred_banks = new_preferred_banks
        db.session.commit()
        return True

    # Más que borrar, se debería ocultar de la pizarra pero el registro debe quedar en base de datos
    # Al cancelar la publicación cambia a estatus cancelado y
    # def delete(self):
    #     db.session.delete(self)
    #     db.session.commit()
    #     return True

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "exchange_rate": self.exchange_rate,
            "balance": self.balance
        }




# Transacción de venta
class Sellpublications(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, unique=False, nullable=False)
    exchange_rate = db.Column(db.Float, unique=True, nullable=False)
    balance = db.Column(db.Float, unique=True, nullable=False)
    message = db.Column(db.String(280), unique=True, nullable=False)
    # preferred_banks puede provenir de una lista desplegable?
    # preferred_banks = 
    # 4 status = [open, trading, filled, canceled]
    status = db.Column(db.String(120), unique=True, nullable=False)
    # Añadir relación con usuario que compra
    # Añadir relación con usuario que vende
    # Añadir relación con historial de operaciones

    def update(self, new_exchange_rate, new_balance, new_message, new_preferred_banks):
        self.exchange_rate = new_exchange_rate
        self.balance = new_balance
        self.message = new_message
        self.preferred_banks = new_preferred_banks
        db.session.commit()
        return True

    # Más que borrar, se debería ocultar de la pizarra pero el registro debe quedar en base de datos
    # Al cancelar la publicación cambia a estatus cancelado y
    # def delete(self):
    #     db.session.delete(self)
    #     db.session.commit()
    #     return True

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "exchange_rate": self.exchange_rate,
            "balance": self.balance
        }




class Transactionhistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, unique=False, nullable=False)
    exchange_rate = db.Column(db.Float, unique=True, nullable=False)
    balance = db.Column(db.Float, unique=True, nullable=False)
    # 4 status = [open, trading, filled, canceled]
    status = db.Column(db.String(120), unique=True, nullable=False)
    # Añadir relación con publicaciones de compra
    # Añadir relación con publicaciones de venta

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "exchange_rate": self.exchange_rate,
            "balance": self.balance
        }
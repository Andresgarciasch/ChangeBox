from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()



# Datos de usuarios
class User(db.Model):
    # Registro
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # Verificación
    birthday = db.Column(db.DateTime, unique=False, nullable=True)
    identification = db.Column(db.String(120), unique=True, nullable=True)
    nationality = db.Column(db.String(120), unique=False, nullable=True)
    # ¿Cómo se añaden los archivos adjuntos?
    # attached_file = db.Column(db.XXXXXX, unique=False, nullable=False)
    # Subir imagen al backend -> Acceder por ruta del backend
    # https://flask.palletsprojects.com/en/2.1.x/patterns/fileuploads/
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    # Funcionamiento
    completed_trades = db.Column(db.Integer, unique=False, nullable=True)
    score = db.Column(db.Integer, unique=False, nullable=True)
    reputation = db.Column(db.Float, unique=False, nullable=True)
    # Añadir relación con "compra" como el que publica (dos usuarios por transacción)
    buy_user_pub = db.relationship('Buypublications', lazy = True, backref='user')
    # Añadir relación con "venta" como el que publica (dos usuarios por transacción)
    # sell_user_pub = db.relationship('Sellpublications', lazy = True, backref='user')
    # # Añadir relación con "compra" como el que se une (dos usuarios por transacción)
    # buy_user_join = db.relationship('Buypublications', lazy = True, backref='user')
    # # Añadir relación con "venta" como el que se une (dos usuarios por transacción)
    # sell_user_join = db.relationship('Sellpublications', lazy = True, backref='user')
    # Añadir relación con "historial de transacciones" (dos usuarios por transacción - relación varios a uno)
    # No queda clara la relación con la base de datos "historial de transacciones"
    # ¿Tendría que añadir un registro de usuario cada vez que dicho usuario participa en una transacción?
    # User_historic = db.relationship('Transactionhistory', lazy = True, backref='user')

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

    def update(self, name, lastname, birthday, identification, nationality):
        self.name = name
        self.lastname = lastname
        self.birthday = birthday
        self.identification = identification     
        self.nationality = nationality 
        db.session.commit()
        return True

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }





# Transacción de compra
class Buypublications(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow, unique=False, nullable=False)
    exchange_rate = db.Column(db.Float, unique=False, nullable=False)
    balance = db.Column(db.Float, unique=False, nullable=False)
    message = db.Column(db.String(280), unique=False, nullable=False)
    # preferred_banks puede provenir de una lista desplegable?
    preferred_banks = db.Column(db.String(280), unique=False, nullable=False)
    # # 4 status = [open, trading, filled, canceled]
    # status = db.Column(db.String(120), unique=False, nullable=False)
    # Añadir relación con usuario que compra/publica (Varios a uno)
    user_id_pub = db.Column(db.Integer, db.ForeignKey('user.id'))
    # # Añadir relación con usuario que vende/se une (Varios a uno)
    # user_id_join = db.Column(db.Integer, db.ForeignKey('user.id'))
    # # Añadir relación con historial de operaciones
    # buy_op = db.relationship('Transactionhistory', lazy = True, backref='buypublications')

    @classmethod
    def create(cls, data):
        try:
            new_buy_publication = cls(**data)
            db.session.add(new_buy_publication)
            db.session.commit()
            return new_buy_publication.serialize()
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    def update(self, exchange_rate, balance, message, preferred_banks):
        self.exchange_rate = exchange_rate
        self.balance = balance
        self.message = message
        self.preferred_banks = preferred_banks
        db.session.commit()
        return True

    # Más que borrar, se debería ocultar de la pizarra pero el registro debe quedar en base de datos
    # Al cancelar la publicación cambia a estatus cancelado
    # def delete(self):
    #     db.session.delete(self)
    #     db.session.commit()
    #     return True

    def serialize(self):
        user = User.query.get(self.user_id_pub)
        return {
            "id": self.id,
            "date": self.date,
            "exchange_rate": self.exchange_rate,
            "balance": self.balance,
            "message": self.message,
            "username": user.username,
            "reputation": user.reputation,
            "preferred_banks": self.preferred_banks
        }




# Transacción de venta 
class Sellpublications(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow, unique=False, nullable=False)
    exchange_rate = db.Column(db.Float, unique=False, nullable=False)
    balance = db.Column(db.Float, unique=False, nullable=False)
    message = db.Column(db.String(280), unique=False, nullable=False)
    # preferred_banks puede provenir de una lista desplegable?
    preferred_banks = db.Column(db.String(280), unique=False, nullable=False)
#     # 4 status = [open, trading, filled, canceled]
#     status = db.Column(db.String(120), unique=False, nullable=False)
    # Añadir relación con usuario que vende/publica (Varios a uno)
    user_id_pub = db.Column(db.Integer, db.ForeignKey('user.id'))
#     # Añadir relación con usuario que compra/se une (Varios a uno)
#     user_id_join = db.Column(db.Integer, db.ForeignKey('user.id'))
#     # Añadir relación con historial de operaciones
#     sell_op = db.relationship('Transactionhistory', lazy = True, backref='sellpublications')

    @classmethod
    def create(cls, data):
        try:
            new_sell_publication = cls(**data)
            db.session.add(new_sell_publication)
            db.session.commit()
            return new_sell_publication.serialize()
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    def update(self, exchange_rate, balance, message, preferred_banks):
        self.exchange_rate = exchange_rate
        self.balance = balance
        self.message = message
        self.preferred_banks = preferred_banks
        db.session.commit()
        return True

    # Más que borrar, se debería ocultar de la pizarra pero el registro debe quedar en base de datos
    # Al cancelar la publicación cambia a estatus cancelado
    # def delete(self):
    #     db.session.delete(self)
    #     db.session.commit()
    #     return True

    def serialize(self):
        user = User.query.get(self.user_id_pub)
        return {
            "id": self.id,
            "date": self.date,
            "exchange_rate": self.exchange_rate,
            "balance": self.balance,
            "message": self.message,
            "username": user.username,
            "reputation": user.reputation,
            "preferred_banks": self.preferred_banks
        }



# Historico de operaciones
# class Transactionhistory(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     date = db.Column(db.DateTime, unique=False, nullable=False)
#     exchange_rate = db.Column(db.Float, unique=True, nullable=False)
#     balance = db.Column(db.Float, unique=True, nullable=False)
#     # # # ¿Cómo se añade el tipo de publicación? ¿Compra y venta?
#     # 4 status = [open, trading, filled, canceled]
#     status = db.Column(db.String(120), unique=True, nullable=False)
#     # Añadir relación con publicaciones de compra
#     buy_pub = db.Column(db.Integer, db.ForeignKey('Buypublications.id'))
#     # Añadir relación con publicaciones de venta
#     sell_pub = db.Column(db.Integer, db.ForeignKey('Sellpublications.id'))
#     # ¿Añadir relación con usuario?
#     # user_id_pub = db.Column(db.Integer, db.ForeignKey('user.id'))
#     # user_id_join = db.Column(db.Integer, db.ForeignKey('user.id'))
    

#     def serialize(self):
#         return {
#             "id": self.id,
#             "date": self.date,
#             "exchange_rate": self.exchange_rate,
#             "balance": self.balance,
#             "status": self.status,
#             "buy_pub": self.buy_pub,
#             "sell_pub": self.sell_pub,
#             # "user_id_pub": self.user_id_pub,
#             # "user_id_join": self.user_id_join
#         }

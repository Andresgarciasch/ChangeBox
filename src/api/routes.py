"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Buypublications, Sellpublications
from api.utils import generate_sitemap, APIException
# from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Registro
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@api.route('/register-user', methods=['POST'])
def handle_register():

    data = request.json
    user = User.create(data)
    if user is not None: 
        access_token = create_access_token(identity=user.id)
        response_body = {
            "message": "{Exito en el registro}",
            "token": access_token
        }
        return jsonify(response_body), 201
    return jsonify({"message": "Ocurrio un error"}), 500    

# Verificacion
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@api.route('/validation-user/', methods=['PUT'])
@jwt_required()
def handle_validation():

    data = request.json
    #AQUI FALTARIA UN CHINGO DE VALIDACIONES
    current_id_user = get_jwt_identity()
    userInfo = User.query.get(current_id_user)
    userInfo.update(**data["data"])
    response_body = {
        "message": "CAMBIO REALIZADO"
    }
    return jsonify(response_body), 200

# Login
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@api.route('/login', methods=['POST'])
def handle_login():

    data_decode = request.json
    # data_decode = json.loads(data)
    user = User.query.filter_by(**data_decode).first()
    if user is None:  
        response_body = {
            "message": "Credenciales Inválidas"
        }
        return jsonify(response_body), 400
    else :
        access_token = create_access_token(identity=user.id)
        response_body = {
            "message": "{Exito en el login}",
            "token": access_token
        }
        return jsonify(response_body), 200

# Publicaciones de compra
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@api.route('/buy-board', methods=['POST','PUT'])
@jwt_required()
def handle_buy():

    data = request.json
    # print(data)

    if request.method == 'POST':

        data["user_id_pub"] = get_jwt_identity()
        buypublications = Buypublications.create(data)
        print(buypublications)
        response_body = {
            "message": "{Publicacion de compra creada con exito}",
        }
        return jsonify(response_body), 201

    elif request.method == 'PUT':
        
        # El objeto a recibir
        # {id: XXXX,
        # data: {datos base de datos}}

        buypublications = Buypublications.query.get(data["id"])
        buypublications.update(**data["data"])
        response_body = {
            "message": "{Cambios realizados en la publicacion de compra}"
        }
        return jsonify(response_body), 200

# Publicaciones de venta
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@api.route('/sell-board', methods=['POST','PUT'])
@jwt_required()
def handle_sell():

    data = request.json
    # print(data)

    if request.method == 'POST':

        data["user_id_pub"] = get_jwt_identity()
        sellpublications = Sellpublications.create(data)
        print(sellpublications)
        response_body = {
            "message": "{Publicacion de venta creada con exito}",
        }
        return jsonify(response_body), 201

    elif request.method == 'PUT':
        
        # El objeto a recibir
        # {id: XXXX,
        # data: {datos base de datos}}

        sellpublications = Sellpublications.query.get(data["id"])
        sellpublications.update(**data["data"])
        response_body = {
            "message": "{Cambios realizados en la publicacion de compra}"
        }
        return jsonify(response_body), 200

# Ruta para obtener publicaciones
@api.route('/get-publications', methods=['GET'])
def handle_get_publications():
    buy_publication_list = Buypublications.query.all()
    sell_publication_list = Sellpublications.query.all()
    buy_publication_list = [buy_publication.serialize() for buy_publication in buy_publication_list]
    sell_publication_list = [sell_publication.serialize() for sell_publication in sell_publication_list]
    response_body = {
        "buy_publication_list": buy_publication_list,
        "sell_publication_list": sell_publication_list,
        "message": "{Publicaciones enviadas con exito}"
    }
    return jsonify(response_body), 200


# Obtener datos para mostrar en modal publicaciones
@api.route('/get-userinfo/<string:username>', methods=['GET'])
def handle_modal_userinfo(username):
    userinfo = User.query.filter_by(username=username).one_or_none()
    if userinfo is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify(userinfo.serialize()), 200


# Pagina privada
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@api.route("/private",methods=["POST"])
@jwt_required()
def handle_private():
    current_id_user = get_jwt_identity()
    userInfo = User.query.get(current_id_user)
    return jsonify(current_id_user), 200
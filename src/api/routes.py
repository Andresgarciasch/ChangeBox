"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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




@api.route('/buy-board', methods=['POST','PUT'])
def handle_buy():
    if request.method == 'POST':

        data = request.json
        buypublications = Buypublications.create(data)
        response_body = {
            "message": "{Publicacion creada con exito}",
        }
        return jsonify(response_body), 201

    elif request.method == 'PUT':

        data = request.json
        buypublications = Buypublications.query.get(id)
        buypublications.update(**data["data"])
        response_body = {
            "message": "{Cambios realizados en la publicacion}"
        }
        return jsonify(response_body), 200




@api.route("/private",methods=["POST"])
@jwt_required()
def handle_private():
    current_id_user = get_jwt_identity()
    userInfo = User.query.get(current_id_user)
    return jsonify(current_user), 200
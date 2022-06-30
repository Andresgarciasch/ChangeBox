"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
# from flask_cors import CORS, cross_origin
# from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

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

        response_body = {
            "message": "Creado el usuario",
            "user": user.serialize()
        }
        return jsonify(response_body), 201
    return jsonify({"message": "Ocurrio un error"}), 500    


@api.route('/validation-user/', methods=['PUT'])
def handle_validation():

    data = request.json
    #AQUI FALTARIA UN CHINGO DE VALIDACIONES
    userInfo = User.query.get(data["id"])
    userInfo.update(**data["data"])
    response_body = {
        "message": "CAMBIO REALIZADO"
    }
    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def handle_login():

    data = request.data
    data_decode = json.loads(data)
    user = User.query.filter_by(**data_decode).first()
    if user is None:  
        response_body = {
            "message": "Credenciales Inválidas"
        }
        return jsonify(response_body), 400
    else :
        access_token = create_access_token(identity=user.id)
        response_body = {
            "message": "La logacion con exito",
            "token": access_token
        }
        return jsonify(response_body), 200


# @api.route("/private",methods=["POST"])
# @jwt_required()
# def handle_private():
#     current_user = get_jwt_identity()
#     return jsonify(current_user), 200
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

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
            "message": "Creado el usuario"
        }
        return jsonify(response_body), 201
    return jsonify({"message": "Ocurrio un error"}), 500    


# @api.route('/validation-user/', defaults={'id': None}, methods=['GET','POST','DELETE'])
@api.route('/validation-user/<int:id>', methods=['PUT'])
def handle_validation():

    data = request.json
    #AQUI FALTARIA UN CHINGO DE VALIDACIONES
    userInfo = User.query.get(id)
    userInfo.update(data['new_date'])
    response_body = {
        "message": "CAMBIO REALIZADO"
    }
    return jsonify(response_body), 200


    elif request.method == 'PUT':
        data = request.json
        #AQUI FALTARIA UN CHINGO DE VALIDACIONES
        episode = Episode.query.get(id)
        episode.update(data['new_name','new_lastname','new_birthday','new_identification','new_nationality'])
        response_body = {
            "message": "CAMBIO SU VAINA CON EXITO SIIUUU"
        }
        return jsonify(response_body), 200

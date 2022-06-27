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

<<<<<<< HEAD
@api.route('/register-user', methods=['POST'])
def handle_register():

   data = request.json
   print(data)
   return jsonify(data)

   


=======

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

    # data = request.json
    # print(data)
    # return jsonify(data)
>>>>>>> develop

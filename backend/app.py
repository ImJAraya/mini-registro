import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from models import db, User
from flask_bcrypt import Bcrypt


load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    CORS(app)
    db.init_app(app)
    bcrypt = Bcrypt(app)

    # Crear las tablas automáticamente al iniciar la app
    with app.app_context():
        db.create_all()

    @app.route('/api/user', methods=['POST'])
    def create_user():
        data = request.get_json()
        if not data or not data.get('email') or not data.get('password') or not data.get('full_name'):
            return jsonify({'error': 'Invalid input'}), 400

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(full_name=data.get('full_name'), email=data['email'], password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify(new_user.serialize()), 201

    @app.route('/api/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([user.serialize() for user in users]), 200   

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5000, debug=True)
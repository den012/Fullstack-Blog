from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util, ObjectId
import json
from flask_bcrypt import Bcrypt
from flask import g

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
app.config["MONGO_URI"] = "mongodb://localhost:27017/myblog"
app.config["SECRET_KEY"] = "secretkey"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)


def convert_object_id(posts):
    for post in posts:
        post['_id'] = str(post['_id'])
    return posts

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = mongo.db.posts.find()
    posts = json_util.loads(json_util.dumps(posts, default=str))
    posts = convert_object_id(posts)
    return jsonify({"posts": posts})

#auth route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    admin_user = mongo.db.user.find_one({"username": username})

    print("Admin user:", admin_user)  # log admin_user
    print("Password:", password)  # log password

    if admin_user and bcrypt.check_password_hash(admin_user['password'], password):
        g.user = admin_user
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid password!"}), 401


if __name__ == "__main__":
    app.run(port=5001, debug=True)
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

@app.route('/create-post', methods=['POST'])
def create_post():
    data = request.get_json()

    title = data.get('title')
    body = data.get('body')
    #image = data.get('image')

    if not title or not body:
        return jsonify({"error": "Missing required fields"}), 400
    
    new_post = {
        "title": title,
        "body": body,
        "image": "https://picsum.photos/700/500"
    }

    result = mongo.db.posts.insert_one(new_post)
    created_post = mongo.db.posts.find_one({"_id": result.inserted_id})
    created_post = json_util.loads(json_util.dumps(created_post, default=str))
    created_post['_id'] = str(created_post['_id'])
    return jsonify({"message": "Post created successuflly", "post": created_post}), 201

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
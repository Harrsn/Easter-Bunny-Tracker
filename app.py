from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import requests
import base64

app = Flask(__name__, static_folder="static")
CORS(app, resources={r"/proxy": {"origins": "*"}})  # Allow CORS for /proxy

TRACCAR_URL = "https://tracker.wvinternet.com/api/positions"
USERNAME = "USER"
PASSWORD = "PASS"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/easter')
def map_page():
    return render_template('index.html')

@app.route('/proxy', methods=['GET'])
def proxy():
    auth_header = base64.b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
    headers = {"Authorization": f"Basic {auth_header}"}
    response = requests.get(TRACCAR_URL, headers=headers)
    
    # Check if the request was successful
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch data"}), response.status_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8443)

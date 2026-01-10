from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "success",
        "message": "Flask API is up and running"
    })

@app.route("/api/v1/ping", methods=["GET"])
def ping():
    return jsonify({
        "response": "pong"
    })

if __name__ == "__main__":
    app.run(debug=True)

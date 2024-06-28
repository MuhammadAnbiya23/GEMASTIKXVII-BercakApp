from flask import Flask, session, flash, redirect, url_for, render_template
from flask_restful import Api
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import os
import cv2
import time
from PIL import Image
from roboflow import Roboflow
from inference_sdk import InferenceHTTPClient


# app = Flask(__name__)
# api = Api(app)
# bcrypt = Bcrypt(app)
# db = MySQL(app)

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'db_gemastik'
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# app.config["SECRET_KEY"] = 'RahasiaKabupatenSukabumi'
# app.config['ENV'] = 'development'
# app.config['DEBUG'] = True

# db.init_app(app)


# initialize the client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="zYzTTZ3D0gFY718ZfmME"
)

def capture_image():
    cap = cv2.VideoCapture(0)  

    if not cap.isOpened():
        print("Error: Could not open camera.")
        return

    while (True):
        ret, frame = cap.read()

        if ret:
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image = Image.fromarray(frame_rgb)
            image.save('static/capture.jpeg')  
            print("Image captured successfully.")
            results = CLIENT.infer("static/capture.jpeg", model_id="sign-language-detection-yolov8/1")
            
            for prediction in results['predictions']:
                print(prediction['class'])
            
        time.sleep(1)
    cap.release()

# infer on a local image
# result = CLIENT.infer("A.9f9a4281-24d8-11ef-ace0-aee644b2bdd5.jpg", model_id="sign-language-detection-yolov8/1")
# print(result)



# for frame_data in results['sign-language-detection-yolov8']:
#     predictions = frame_data.get('predictions', [])
#     for prediction in predictions:
#         detected_classes.add(prediction['class'])

# for detected_class in detected_classes:
#     print(detected_class)

# from routes import *

# if __name__ == "__main__":
#     app.run(debug=True)

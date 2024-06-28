from PIL import Image
import numpy as np
import cv2
import re
from io import BytesIO
import base64
from inference_sdk import InferenceHTTPClient

def is_valid_email(email):
    regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return re.match(regex, email)

def is_valid_password(password):
    return len(password) >= 8

CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="zYzTTZ3D0gFY718ZfmME"
)

class VideoCamera:
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)  
        self.video.set(cv2.CAP_PROP_FPS, 25)  

    def __del__(self):
        self.video.release()

    def get_frame(self):
        success, image = self.video.read()
        if not success:
            return None
        
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)                
        results = CLIENT.infer(image_rgb, model_id="sign-language-detection-yolov8/1")

        if len(results['predictions']) > 0:
            print(results['predictions'][0]['class'])
        

        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

def gen(camera):
    while True:
        frame = camera.get_frame()
        if frame is None:
            continue
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

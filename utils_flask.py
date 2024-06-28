from roboflow import Roboflow
from PIL import Image
import numpy as np
import time
import cv2
import re

rf = Roboflow(api_key="zYzTTZ3D0gFY718ZfmME")
project = rf.workspace().project("sign-language-detection-yolov8")
model = project.version(1).model

class VideoCamera:
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  # Set lebar frame
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)  # Set tinggi frame
        self.video.set(cv2.CAP_PROP_FPS, 30)  # Set frame rate

    def __del__(self):
        self.video.release()

    def get_frame(self):
        success, image = self.video.read()
        if not success:
            return None
        
        results = model.predict(image, confidence=50, overlap=20).json()

        for prediction in results['predictions']:
            x = int(prediction['x'])
            y = int(prediction['y'])
            width = int(prediction['width'])
            height = int(prediction['height'])
            cv2.rectangle(image, (x, y), (x + width, y + height), (0, 255, 0), 2)
            cv2.putText(image, prediction['class'], (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

def gen(camera):
    while True:
        frame = camera.get_frame()
        if frame is None:
            continue
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

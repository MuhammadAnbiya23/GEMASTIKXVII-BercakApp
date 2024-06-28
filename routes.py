from flask import request, session, flash, redirect, url_for, render_template, Response
from app import app
from utils_flask import gen, VideoCamera

@app.route('/toggle-color-mode')
def toggle_color_mode():
    mode = request.args.get('mode')
    if mode == 'on':
        session['color_mode'] = 'on'
        return redirect(url_for('indexv2'))
    else:
        session['color_mode'] = 'off'
        return redirect(url_for('index'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/indexv2')
def indexv2():
    return render_template('indexv2.html')

@app.route('/deafEducation')
def deafEducation():
    return render_template('deafEducation.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/signRecognition')
def signRecognition():
    return render_template('signRecognition.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/speechRecognition', methods=['GET'])
def speechRecognition():
    return render_template('speechRecognition.html')

@app.route('/resource')
def resource():
    return render_template('resource.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/sosmed')
def sosmed():
    return render_template('sosmed.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')


@app.route('/deafEduv2')
def deafEduv2():
    return render_template('deafEduv2.html')

@app.route('/quizv2')
def quizv2():
    return render_template('quizv2.html')

@app.route('/signRv2')
def signRv2():
    return render_template('signRv2.html')

@app.route('/speechRv2', methods=['GET'])
def speechRv2():
    return render_template('speechRv2.html')

@app.route('/resourcev2')
def resourcev2():
    return render_template('resourcev2.html')

@app.route('/aboutv2')
def aboutv2():
    return render_template('aboutv2.html')

@app.route('/sosmedv2')
def sosmedv2():
    return render_template('sosmedv2.html')

@app.route('/faqv2')
def faqv2():
    return render_template('faqv2.html')

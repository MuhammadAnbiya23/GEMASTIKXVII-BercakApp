from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__)

@main_bp.route("/")
def index():
    return render_template("index.html")

@main_bp.route("/other-page")
def other_page():
    return render_template('indexv2.html')

@main_bp.route('/deafEducation')
def deafEducation():
    return render_template('deafEducation.html')

@main_bp.route('/quiz')
def quiz():
    return render_template('quiz.html')

@main_bp.route('/signRecognition')
def signRecognition():
    return render_template('signRecognition.html')

@main_bp.route('/speechRecognition')
def speechRecognition():
    return render_template('speechRecognition.html')

@main_bp.route('/contact')
def contact():
    return render_template('contact.html')

@main_bp.route('/resource')
def resource():
    return render_template('resource.html')

@main_bp.route('/about')
def about():
    return render_template('about.html')

@main_bp.route('/sosmed')
def sosmed():
    return render_template('sosmed.html')

@main_bp.route('/faq')
def faq():
    return render_template('faq.html')

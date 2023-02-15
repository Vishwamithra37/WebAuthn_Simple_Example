from flask import Flask, render_template
import flask
import wb
import wb2
app = Flask(__name__)

###Commits###

@app.route('/',methods=['GET'])
def index():
    complete_options=wb.create_options_using_webauthn()
    verification_options=wb2.create_options_using_webauthn_for_authentication()
    return render_template('index.html', complete_options=complete_options, verification_options=verification_options)

@app.route("/register", methods=["POST"])
def register():
    dat0=flask.request.get_json()
    wea=wb.registration_verification(dat0)
    return ({"status": "Successfully Verifiedd"})

@app.route('/verify', methods=['POST'])
def verify():
    dat0=flask.request.get_json()
    wea=wb2.authentication_verification(dat0)
    return ({"status": "Successfully Verified"})

if __name__ == '__main__':
    app.run(host='localhost', port=8001, debug=True)
 

 

from flask import Flask, render_template, request, redirect, url_for, session,jsonify
from flask_mysqldb import MySQL,MySQLdb
import bcrypt
import uuid
from flask_mail import Mail, Message
from flask_cors import CORS
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, AnyOf
from flask_wtf import FlaskForm
from validate_email import validate_email
from PIL import Image, ImageOps, ImageEnhance
import os


app = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'skin'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['DEBUG'] = True
app.config['TESTING'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
#app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'skininfectiondetection@gmail.com'
app.config['MAIL_PASSWORD'] = 'Ab1234abcd'
app.config['MAIL_DEFAULT_SENDER'] = 'skininfectiondetection@gmail.com'
app.config['MAIL_MAX_EMAILS'] = None
app.config['MAIL_ASCII_ATTACHMENTS'] = False

mail = Mail(app)
mysql = MySQL(app)
useremail = ''


####################### validate picture ###########################
ALLOWED_EXTENSIONS = { 'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           

@app.route('/')
def home():
    return render_template("home.html")

####################### STUDENT REGISTER ###########################

@app.route('/sregister', methods=["GET", "POST"])
def sregister():
    if request.method == 'POST':
        
        email = request.json['email']
        if validate_email(email): ####validation as email
            password = request.json['password'].encode('utf-8')
            logtoken = str(uuid.uuid4())  ## token for frontend session

            curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            curl.execute("SELECT * FROM users WHERE email=%s",(email,))
            user = curl.fetchone()
            curl.close()

        
            
            if user is None:
                name = request.json['name']
                email = request.json['email']
                university=request.json['university']
                sex=request.json['gender']
                country=request.json['country']
                possition="student"
                UIfor = "student"    ###### for ui######
                password = request.json['password'].encode('utf-8')
                hash_password = bcrypt.hashpw(password, bcrypt.gensalt())

                cur = mysql.connection.cursor()
                cur.execute("INSERT INTO users (email, password, possition, name) VALUES (%s,%s,%s,%s)",(email,hash_password,possition,name,))
                cur.execute("INSERT INTO student (name, email, university, sex, country) VALUES (%s,%s,%s,%s,%s)",(name,email,university,sex,country,))
                mysql.connection.commit()
                session['name'] = request.json['name']
                session['email'] = request.json['email']
                msg = "sucess"
                curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                curl.execute("SELECT * FROM users WHERE email=%s",(email,))
                user = curl.fetchone()
                curl.close()
                picname = user['picname'] #get de default pro pic name
                picpath = (os.path.join("images",picname)) #get the pro pic path
                return jsonify({'allow': True , 'token' : logtoken , 'email' : email  , 'uifor' : UIfor , "msg" : msg , 'name' : name , 'picpath' : picpath})
            

            else:
                return jsonify({'allow': False , 'token' : '' , 'email' : '' , 'uifor' : '' , "msg" : "You have an account" , 'name' : ""})
            
        else:
            return jsonify({'allow': False , 'token' : '' , 'email' : '' , 'uifor' : '' , "msg" : "Not a valid Email" , 'name' : ""}) ##Not a valid email (without @)
        
####################### DOCTOR REGISTER ###########################
          

@app.route('/dregister', methods=["GET", "POST"])
def dregister():
    if request.method == 'GET':
        return render_template("dregister.html")
    else:
        email = request.json['email']
        if validate_email(email): ####validation as email
            password = request.json['password'].encode('utf-8')
            like = request.json['like']
        

            curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            curl.execute("SELECT * FROM users WHERE email=%s",(email,))
            user = curl.fetchone()
            curl.close()

        
            
            if user is None:
                name = request.json['name']
                email = request.json['email']
                like = request.json['like']
                specialization=request.json['specialization']
                sex=request.json['gender']
                country=request.json['country']
                regnum=request.json['regnum']
                hospital=request.json['hospital']
                possition="doctor" 
                UIfor = "doctor"    ###### for ui######
                password = request.json['password'].encode('utf-8')
                hash_password = bcrypt.hashpw(password, bcrypt.gensalt())
                logtoken = str(uuid.uuid4()) 
                region = ''

                cur = mysql.connection.cursor()
                cur.execute("INSERT INTO users (email, password, possition, name) VALUES (%s,%s,%s,%s)",(email,hash_password,possition,name,))
                cur.execute("INSERT INTO doctor (name, email, specialization, sex, country, regnum, hospital) VALUES (%s,%s,%s,%s,%s,%s,%s)",(name,email,specialization,sex,country,regnum,hospital,))
                if like == True:
                    region = request.json['region']
                    cur.execute("INSERT INTO dermatologist (email, name, hospital, region) VALUES (%s,%s,%s,%s)",(email,name,hospital,region,))
                    UIfor = "dermatogist"
                mysql.connection.commit()
                session['name'] = request.json['name']
                session['email'] = request.json['email']

                curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                curl.execute("SELECT * FROM users WHERE email=%s",(email,))
                user = curl.fetchone()
                curl.close()
                picname = user['picname'] #get de default pro pic name
                picpath = (os.path.join("images",picname)) #get the pro pic path
                return jsonify({'allow': True , 'token' : logtoken , 'email' : email  , 'uifor' : UIfor , "msg" : "success" , 'name' : name , 'picpath' : picpath , 'hospital' : hospital , 'region' : region})

            else:
                return jsonify({'allow': False , 'token' : '' , 'email' : ''  , 'uifor' : '' , "msg" : "You have an account", 'name' : ''})
        else:
            return jsonify({'allow': False , 'token' : '' , 'email' : '' , 'uifor' : '' , "msg" : "Not a valid Email" , 'name' : ""}) ##Not a valid email (without @)

####################### LOGIN ###########################


@app.route('/login',methods=["GET","POST"])
def login():
    if request.method == 'POST':
        email = request.json['email']
        if validate_email(email): ####validation as email
            password = request.json['password'].encode('utf-8')
            logtoken = str(uuid.uuid4())

            curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            curl.execute("SELECT * FROM users WHERE email=%s",(email,))
            user = curl.fetchone()
            curl.close()

            if user is None: # no record in db
                return jsonify({'allow': False , 'token' : '' , 'email' : ''  , 'uifor' : '' , "msg" : "Incorect Email", "name": ''})

            if len(email) == 0: #no record in request
                return jsonify({'allow': False , 'token' : '' , 'email' : ''  , 'uifor' : '' , "msg" : "Enter Username and password", "name": ''})

        
            if len(user) > 0: #have a record in db
                if bcrypt.hashpw(password, user["password"].encode('utf-8')) == user["password"].encode('utf-8'):
                    session['name'] = user['name']
                    session['email'] = user['email']
                    name = user['name']
                    curso = mysql.connection.cursor(MySQLdb.cursors.DictCursor) ######## to select ui hospital region
                    curso.execute("SELECT * FROM dermatologist WHERE email=%s",(email,))
                    person = curso.fetchone()
                    curso.close()
                    curs = mysql.connection.cursor(MySQLdb.cursors.DictCursor) ######## to get hospital 
                    curs.execute("SELECT * FROM doctor WHERE email=%s",(email,))
                    doc = curs.fetchone()
                    curs.close()
                    picname = user['picname'] #get pro pic name
                    picpath = (os.path.join("images",picname)) #get the pro pic path
                    region = ''
                    hospital = ''
                    UIfor = 'doctor'
                    if person is not None:
                        UIfor = "dermatologist"   ###### for ui######
                        region = person['region']
                        
                    if doc is not None:
                        hospital = doc['hospital']
                    else:
                        UIfor= user['possition']
                    return jsonify({'allow': True , 'token' : logtoken , 'email' : email  , 'uifor' : UIfor , "msg" : "success" , "name": name , 'picpath' : picpath  , "region" : region , "hospital" : hospital})
                else:
                    return jsonify({'allow': False , 'token' : '' , 'email' : ''  , 'uifor' : '' , "msg" : "Error password and email not match", "name": ""})
                
            else:
                return jsonify({'allow': False , 'token' : '' , 'email' : ''  , 'uifor' : '' , "msg" : "Error user not found", "name": ''})
        else:
            return jsonify({'allow': False , 'token' : '' , 'email' : '' , 'uifor' : '' , "msg" : "Not a valid Email" , 'name' : ""}) ##Not a valid email (without @)

####################### CHANGE PASSWORD ###########################


@app.route('/changepassword',methods=["GET","POST"])
def changepassword():
    if request.method == 'POST':
        opassword = request.json['oldpassword'].encode('utf-8')
        email = request.json['email']
        newpassword = request.json['newpassword'].encode('utf-8')
        nhash_password = bcrypt.hashpw(newpassword, bcrypt.gensalt())
        

        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM users WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()


        if user is not None:
            if bcrypt.hashpw(opassword, user["password"].encode('utf-8')) == user["password"].encode('utf-8'):
                cur = mysql.connection.cursor()
                cur.execute("UPDATE users SET password=(%s) WHERE email=(%s)",(nhash_password,email,))
                mysql.connection.commit()
                return jsonify("Password updated")
            else:
                return jsonify("Enter correct old password")


####################### CHANGE STUDENT TO A DOCTOR ###########################

    
@app.route('/changepossition', methods=["GET", "POST"])
def changepossition():
    if request.method == 'POST':
        
        email = request.json['email']
        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM users WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()

        name = user['name']
        specialization = request.json['specialization']
        regnum = request.json['regnum']
        hospital=request.json['hospital']
        newpossition="doctor"

        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM student WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()

        sex = user['sex']
        country = user['country']
        s_id = user['s_id']
        

        cur = mysql.connection.cursor()
        cur.execute("UPDATE users SET possition=(%s) WHERE email=(%s)",(newpossition,email,))
        cur.execute("INSERT INTO doctor (name, email, specialization, sex, country, regnum, hospital) VALUES (%s,%s,%s,%s,%s,%s,%s)",(name,email,specialization,sex,country,regnum,hospital,))
        cur.execute("DELETE FROM student WHERE s_id = %s",(s_id,))
        mysql.connection.commit()

        return jsonify({'done': True , 'hospital' : hospital})

####################### CHANGE Doctor TO A Dermatologist ###########################

    
@app.route('/changetodermatology', methods=["GET", "POST"])
def changetodermatology():
    if request.method == 'POST':
        
        email = request.json['email']
        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM users WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()

        name = user['name']
        specialization = "dermatologist"
        hospital=request.json['hospital']
        region=request.json['region']
        #newpossition="doctor"

        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM doctor WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()

        
        d_id = user['d_id'] ##if update not work update from this
        

        cur = mysql.connection.cursor()
        cur.execute("UPDATE doctor SET specialization=(%s) WHERE email=(%s)",(specialization,email,))
        cur.execute("UPDATE doctor SET hospital=(%s) WHERE email=(%s)",(hospital,email,))
        cur.execute("INSERT INTO dermatologist (email, name, hospital, region) VALUES (%s,%s,%s,%s)",(email,name,hospital,region,))
        mysql.connection.commit()

        return jsonify({'done': True , 'hospital' : hospital , 'region':region})

####################### FORGOT PASSWORD ###########################

@app.route('/forgotpassword', methods=["GET", "POST"])
def forgotpassword():
    if request.method == 'POST':
        email = request.json['email']
        if validate_email(email): ####validation as email
            token = str(uuid.uuid4()) ##genarate token as a verfication code for user

            curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            curl.execute("SELECT * FROM users WHERE email=%s",(email,))
            user = curl.fetchone()
            curl.close()
            if user is not None:
                cur = mysql.connection.cursor()
                cur.execute("UPDATE users SET token=(%s) WHERE email=(%s)",(token,email,))
                session['email'] = user['email']
                session['token'] = user['token']
                mysql.connection.commit()
                msg = Message("Verification Code", recipients=[email])
                msg.body = token
                mail.send(msg)
                return jsonify({"email" : email})
            else:
                return jsonify("invalid email")

        else:
            return jsonify ("Not a valid email") ##Not a valid email (without @)

            
####################### COMPARE THE VERIFICATION CODE FOR FORGOT PASSWORD ###########################


@app.route('/verifycode', methods=["GET", "POST"])
def verifycode():
    email = request.json['email']
    verifycode=request.json['verifycode']
    newpassword = request.json['password'].encode('utf-8')
    nhash_password = bcrypt.hashpw(newpassword, bcrypt.gensalt())
    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("SELECT * FROM users WHERE email=%s",(email,))
    user = curl.fetchone()
    curl.close()
    token = user['token']
    if user is not None:
       if verifycode == token:
        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM users WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()
        cur = mysql.connection.cursor()
        cur.execute("UPDATE users SET password=(%s) WHERE email=(%s)",(nhash_password,email,))
        mysql.connection.commit()
        return jsonify("sucess")
       else:
        return jsonify(email)
    else:
        return jsonify("invalid email")
        

####################### SEARCH A DOCTOR ###########################
 
        
@app.route('/searchdoc', methods=["GET", "POST"])
def searchdoc():
    if request.method == 'POST':
    
        region = request.json['region']
        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM dermatologist WHERE region=%s ",(region,))
        rows = curl.fetchall()
        curl.close()
        list1=[]  ##name list
        list2=[]  ##email list
        list3=[]  ##hospital list
        list4=[]  ##region list

        if rows is not None:
            for i in rows:
                list1.append(i["name"])
                list2.append(i["email"])
                list3.append(i["hospital"])
                list4.append(i["region"])

            return jsonify((list1) ,(list2) , (list3), (list4)) 
        else:
            return jsonify("No result found")


####################### CHANGE THE HOSPITAL OF A DOCTOR ###########################


@app.route('/edithospital', methods=["GET", "POST"])
def edithospital():
    if request.method == 'POST':
        
        email=request.json['email']
        
        nhospital=request.json['hospital']
        #sex = session['sex']
        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM doctor WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()
        curso = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curso.execute("SELECT * FROM dermatologist WHERE email=%s",(email,))
        users = curso.fetchone()
        curso.close()
        if user is not None:
            d_id=user['d_id']
            cur = mysql.connection.cursor()
            cur.execute("UPDATE doctor SET hospital=(%s) WHERE d_id=(%s)",(nhospital,d_id,))
            mysql.connection.commit()

            if users is not None:
                der_id=users['der_id']
                cur = mysql.connection.cursor()
                cur.execute("UPDATE dermatologist SET hospital=(%s) WHERE der_id=(%s)",(nhospital,der_id,))
                mysql.connection.commit()

            return jsonify("Hospital updated")

        return jsonify("Hospital not updated error")

        
####################### CHANGE THE WORKING REGION OF A DOCTOR ###########################


@app.route('/editregion', methods=["GET", "POST"])
def editregion():
    if request.method == 'POST':
        email=request.json['email']
        nregion=request.json['region']
        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("SELECT * FROM dermatologist WHERE email=%s",(email,))
        user = curl.fetchone()
        curl.close()
        
        if user is not None:
            der_id=user['der_id']
            cur = mysql.connection.cursor()
            cur.execute("UPDATE dermatologist SET region=(%s) WHERE der_id=(%s)",(nregion,der_id,))
            mysql.connection.commit()
            return jsonify(" region updated")

        return jsonify(" region not updated error")

####################### Profile picture update ###########################

@app.route('/propic', methods=["GET", "POST"])
def propic():
    if request.method == 'POST':
        email=request.json['email']
        profilepic = request.files.get('pic')
        
        if profilepic and allowed_file(profilepic.filename): ## validate is extention is in the ALLOWED_EXTENSIONS
            picname=str(uuid.uuid1()) + os.path.splitext(profilepic.filename)[1] ##give a name
            profilepic.save(os.path.join("images",picname))
            curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            curl.execute("SELECT * FROM users WHERE email=%s",(email,))
            user = curl.fetchone()
            curl.close()
            
            oldimage = user['picname']
            cur = mysql.connection.cursor()
            cur.execute("UPDATE users SET picname=(%s) WHERE email=(%s)",(picname,email,))
            mysql.connection.commit()
            picpath = (os.path.join("images",picname)) #get the pro pic path
            if oldimage == 'default.jpg':
                return jsonify(picpath)
            else:
                os.remove(os.path.join("images",oldimage)) #to delete previous updated image
                return jsonify(picpath)

            
        else:
            return jsonify("Error uploading")


 ####################### LOGOUT ###########################
           
@app.route('/logout')
def logout():
    if request.method == 'GET':
        session.clear()
        return jsonify({'allow': False});

if __name__ == '__main__':
    app.secret_key = "^A%DJAJU^JJ123"
    app.run(debug=True)

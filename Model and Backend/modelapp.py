from __future__ import division
#from flask import Flask, render_template, request
from keras.models import load_model
import tensorflow as tf
from tensorflow.keras.models import Sequential
#from flask import Flask, render_template, request
import base64
import io
import re

from flask import Flask, request, jsonify, render_template
import joblib

# python libraties
import os,itertools
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from tqdm import tqdm
from glob import glob
from PIL import Image

# pytorch libraries
import torch
from torch import optim,nn
from torch.autograd import Variable
from torch.utils.data import DataLoader,Dataset
from torchvision import models,transforms

# sklearn libraries
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from flask_cors import CORS

# to make the results are reproducible
np.random.seed(10)
torch.manual_seed(10)
torch.cuda.manual_seed(10)

# declare constants
HOST = '0.0.0.0'
PORT = 8081 #os.environ.get('PORT')

# initialize flask application
app = Flask(__name__)
CORS(app)



model_name = 'densenet'
num_classes = 7
feature_extract = False
# Initialize the model for this run
#model_ft, input_size = initialize_model(model_name, num_classes, feature_extract, use_pretrained=True)
# Define the device:
device = torch.device('cuda:0')
# Put the model on the device:
#model = model_ft.to(device)

def init():
    global model,graph
    # load the pre-trained Keras model
    
    import torch
    torch.manual_seed(0)
    import torchvision
    import torchvision.transforms as transforms
    from torch.autograd import Variable
    from PIL import Image, ImageOps, ImageEnhance

    
    #print(mod)

    #model = model()  # Initialize model
    #model=torch.load(os.getcwd() + ('/drive/My Drive/skin_diseasesAshan.hdf5'))  # Load pretrained parameters
    model.eval()  # Set to eval mode to change behavior of Dropout, BatchNorm
transform= transforms.Compose(
        [transforms.Resize((299,299)),
         transforms.ToTensor(),
         transforms.Normalize((0.7630333, 0.5456471, 0.57004035), (0.14092793, 0.15261291, 0.1699709))])  # Same as for your validation data, e.g. Resize, ToTensor, Normalize, ...

SKIN_CLASSES= {
      0: 'Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowen’s disease)',
      1: 'Basal Cell Carcinoma',
      2: 'Benign Keratosis',
      3: 'Dermatofibroma',
      4: 'Melanocytic Nevi',
      5: 'Vascular skin lesion',
      6: 'Melanoma'

    }
    

@app.route('/api/predict', methods=['POST'])
def predict():
        model=torch.load('model/skin.hdf5')
        #message = request.get_json(force=True)
	    #encoded = message['image']
	    #decoded = base64.b64decode(encoded)
	    #dataBytesIO=io.BytesIO(decoded)
	    #dataBytesIO.seek(0)
        #img = Image.open(dataBytesIO) # Load image as PIL.Image
        #req = request.files['file']
        #req.save('images.jpg')
        img = Image.open(request.files['file'].stream)
        x = transform(img)  # Preprocess image
        x = x.unsqueeze(0)  # Add batch dimension
        images = Variable(x).to(device)
        output = model(images)  # Forward pass
        pred = torch.argmax(output)  # Get predicted class if multi-class classification
        x = torch.tensor([pred])
        classnum =x.item()
        #predc = torch.max(output)
        #modelpred=predc.item()
        #print(SKIN_CLASSES[classnum],imgs)

        return jsonify('Predicted : ' + SKIN_CLASSES[classnum])
		
if __name__ == '__main__':
    # run web server
    app.run(host=HOST,debug=True,port=PORT)
    #app.run(debug=True)

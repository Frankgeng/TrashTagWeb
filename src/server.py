from io import BytesIO
from flask import Flask, render_template, request, redirect, Response, make_response, current_app
import random, json, base64, time, os, io, sys, pickle, googlemaps
from datetime import timedelta
from functools import update_wrapper
from flask_cors import CORS
from PIL import Image

gmaps = googlemaps.Client(key="AIzaSyCQAR1Y_Mnek-Z3QskKh8Z9FDF_QpYWvEI")

app = Flask(__name__)
CORS(app)
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, str):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, str):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

PNG_START = 22
JPEG_START = 23

@app.route('/receiver', methods = ['POST'])
@crossdomain(origin="*")
def worker():
	# read json + reply
    data = request.get_json(force=True)
    add = data['add']
    images = pickle.load(open("images", "rb"))
    if add == 'true':
        pic = data["pic"]
        # pic = base64.b64decode(pic[PNG_START:] if pic[:13] == 'data:image/png' else pic[JPEG_START:])
        location = data["location"]
        time = data["time"]
        event_name = data["eventName"]
        name = data["name"]
        event = {"pic": pic, "location": location, "time": time, "name": name, "eventName":event_name}
        loc = gmaps.geocode(location)
        print(loc)
        images.append(event)
        pickle.dump(images, open("images", "wb"))
        response = loc
        return json.dumps(response)
    else:
        # TODO: send back list of all images
        for image in images:
            print(image['name'])
        val = json.dumps(images)
        return val
if __name__ == '__main__':
	# run!
    global images
    # images = []
    # pickle.dump(images, open("images", "wb"))
    images = pickle.load(open("images", "rb"))
    app.debug = True
    app.run() #to have it work locally
    # app.run('0.0.0.0', '5010') to let others connect, requires host's IP address (ipconfig)
    # app.run('0.0.0.0', '5010')

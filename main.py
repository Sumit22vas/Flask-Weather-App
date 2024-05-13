from flask import Flask,render_template,request
from waitress import serve
from weather import get_weather_data

app = Flask(__name__)

# Homepage or Index Page
@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

# Get request to request weather data and send reponse to client
@app.route("/weather/<city>")
def get_weather_info(city):
    # get weather data
    weather_data = get_weather_data(city)

    if weather_data["cod"] ==  200:
        response = {
            "status" : "success",
            "city_name" : weather_data["name"],
            "current_temp" : weather_data["main"]["temp"],
            "humidity" : weather_data["main"]["humidity"],
            "min_temp" : weather_data["main"]["temp_min"],
            "max_temp" : weather_data["main"]["temp_max"],
            "description" : weather_data["weather"][0]["description"],
            "feels_like" : weather_data["main"]["feels_like"]
        }

        return response
    else:
        return {
            "status" : "failed",
            "message" : "Something Went Wrong! Please Try with valid city name"
        }

# use waitress to run server for production
if __name__ == "__main__":
    serve(app,host="0.0.0.0",port=8000)
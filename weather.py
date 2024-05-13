import requests
from os import getenv as get_env_var
from dotenv import load_dotenv

# load environment variables
load_dotenv()

# function to get weather informtaion
# parasm : City 
def get_weather_data(city):

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={get_env_var("OW_API_KEY")}&units=metric"
    data = requests.get(url).json()
    return data

#if file is called directly, It is for debugging purpose only
if __name__ == "__main__":
    city = input("\n\n Enter City Name : \n\n")

    weather_data = get_weather_data(city)

    if weather_data["cod"] == 200:
        print(f"Weather Update : Today in {weather_data["name"]}")
        print(f"Current Temperature : {weather_data["main"]["temp"]}")
        print(f"Humidity : {weather_data["main"]["humidity"]}")
        print(f"Today's Minimum Temp : {weather_data["main"]["temp_min"]}")
        print(f"Today's Maximum Temp : {weather_data["main"]["temp_max"]}")
        print(f"Description : {weather_data["weather"][0]["description"]}, Feels like {weather_data["main"]["feels_like"]}")
    else:
        print("Something went wrong")
        
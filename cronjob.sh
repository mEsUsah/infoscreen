#!/bin/bash

# Run as a cronjob each hour. Example:
# 0 * * * * /var/www/html/cronjob.sh

curl -sA "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36" --url "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=62.9104&lon=7.7054" > /var/www/html/web/resources/weather.json

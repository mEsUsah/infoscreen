# Infoscreen
This is a simple app to display general info in my hallway at home

## Installation ##
- Install a webserver (Apache, Nginx anything else you prefer)
- Git clone this project into the defualt virtualhost directory
```
  cd <virtualhost directory>
  git clone git@github.com:mEsUsah/infoscreen.git .
```
- Add the the cronjob script to your crontab
```
  sudo crontab -e
```
- Change the API url in the cronjob to reflect the area you want to get weather data for.
- Add the startup script to your host startup scrip
```
  sudo vim /etc/xdg/lxsession/LXDE-pi/autostart
```
- Change the startup script to reflect you own hostname or simply use localhost.
- Build project CSS and JS
```
  cd <virtualhost directory>
  npm install
  npm run prod
```
- Verify successfull installation and build by navigating to your hostname in a browser

## TODO: ##
- Add support for some type of calendar activity management.
- Fix weather icons

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
- Add the startup script to your host startup scrip
```
  sudo vim /etc/xdg/lxsession/LXDE-pi/autostart
```
- Change the startup script to reflect you own hostname or simply use localhost.

## TODO: ##
- Add support for some type of calendar activity management.
- Fix weather icons

import Chart from '../../../node_modules/chart.js/dist/Chart.js';

let icons = [];
icons["clearsky"] = new Image();
icons["clearsky"].src = 'resources/icons/clearsky.svg';
icons["cloudy"] = new Image();
icons["cloudy"].src = 'resources/icons/cloudy.svg';
icons["fair"] = new Image();
icons["fair"].src = 'resources/icons/fair.svg';
icons["fog"] = new Image();
icons["fog"].src = 'resources/icons/fog.svg';
icons["heavyrain"] = new Image();
icons["heavyrain"].src = 'resources/icons/rain.svg';
icons["heavyrainandthunder"] = new Image();
icons["heavyrainandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["heavyrainshowers"] = new Image();
icons["heavyrainshowers"].src = 'resources/icons/rain.svg';
icons["heavyrainshowersandthunder"] = new Image();
icons["heavyrainshowersandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["heavysleet"] = new Image();
icons["heavysleet"].src = 'resources/icons/sleet.svg';
icons["heavysleetandthunder"] = new Image();
icons["heavysleetandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["heavysleetshowers"] = new Image();
icons["heavysleetshowers"].src = 'resources/icons/sleet.svg';
icons["heavysleetshowersandthunder"] = new Image();
icons["heavysleetshowersandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["heavysnowandthunder"] = new Image();
icons["heavysnowandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["heavysnowshowers"] = new Image();
icons["heavysnowshowers"].src = 'resources/icons/snow.svg';
icons["heavysnowshowersandthunder"] = new Image();
icons["heavysnowshowersandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["lightrain"] = new Image();
icons["lightrain"].src = 'resources/icons/sprinkle.svg';
icons["lightrainandthunder"] = new Image();
icons["lightrainandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["lightrainshowers"] = new Image();
icons["lightrainshowers"].src = 'resources/icons/sprinkle.svg'
icons["lightrainshowersandthunder"] = new Image();
icons["lightrainshowersandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["lightsleetandthunder"] = new Image();
icons["lightsleetandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["lightsleetshowers"] = new Image();
icons["lightsleetshowers"].src = 'resources/icons/sprinkle.svg'
icons["lightsnow"] = new Image();
icons["lightsnow"].src = 'resources/icons/snow.svg';
icons["lightsnowandthunder"] = new Image();
icons["lightsnowandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["lightsnowshowers"] = new Image();
icons["lightsnowshowers"].src = 'resources/icons/snow.svg';
icons["lightssleetshowersandthunder"] = new Image();
icons["lightssleetshowersandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["partlycloudy"] = new Image();
icons["partlycloudy"].src = 'resources/icons/fair.svg';
icons["rain"] = new Image();
icons["rain"].src = 'resources/icons/rain.svg';
icons["rainandthunder"] = new Image();
icons["rainandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["rainshowers"] = new Image();
icons["rainshowers"].src = 'resources/icons/rain.svg';
icons["rainshowersandthunder"] = new Image();
icons["rainshowersandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["sleet"] = new Image();
icons["sleet"].src = 'resources/icons/sleet.svg';
icons["sleetandthunder"] = new Image();
icons["sleetandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["sleetshowers"] = new Image();
icons["sleetshowers"].src = 'resources/icons/sleet.svg';
icons["sleetshowersandthunder"] = new Image();
icons["sleetshowersandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["snow"] = new Image();
icons["snow"].src = 'resources/icons/snow.svg';
icons["snowandthunder"] = new Image();
icons["snowandthunder"].src = 'resources/icons/thunderstorm.svg';
icons["snowshowers"] = new Image();
icons["snowshowers"].src = 'resources/icons/snow.svg';
icons["snowshowersandthunder"] = new Image();
icons["snowshowersandthunder"].src = 'resources/icons/thunderstorm.svg';

Chart.pluginService.register({
    afterUpdate: function(chart) {
        chart.config.data.datasets[0]._meta[0].data[2]._model.pointStyle = icons["cloudy"];
    }
});


export default {
    _hamburger  : document.querySelector("[data-menu-button]"),
    _menu       : document.querySelector("[data-menu-content]"),
	init() {
        var ctx = document.getElementById('myChart');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: ['1','2','3','4','5','6','7','8', '9', '10', '11', '12', '13', '14','15','16','17','18'],
                datasets: [{
                    title: {
                        display: true,
                        text: 'Dagens vær'
                    },
                    label: 'Temperatur',
                    //backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 255, 255)',
                    pointRadius: 0,
                    pointBackgroundColor: 'rgb(0,0,0)',
                    fill: false,
                    data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
                    pointStyle: []

                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 50,
                        top: 50,
                        bottom: 50
                    }
                }
            }
        });
        chart.canvas.parentNode.style.height = '300px';
        chart.canvas.parentNode.style.width = '100%';
        
        function updateChart(timeofday, temperatures, images){
            chart.data.datasets[0].data = temperatures;
            chart.data.labels = timeofday;
            chart.data.datasets[0].pointStyle = images;
            chart.update();
        };

        function transferComplete(){
            let weatherData = JSON.parse(this.responseText);
            let weatherHours = weatherData.properties.timeseries;
            //console.log(weatherHours);
            let dataTemperatures = [];
            let dataHours = [];
            let dataSymbols = [];
            let dataImages = [];
            for (let i = 0; i < 18; i++) {
                dataTemperatures[i] = weatherHours[i].data.instant.details.air_temperature;
                dataHours[i] = new Date(weatherHours[i].time).getHours();
                let dataSymbolRaw = weatherHours[i].data.next_1_hours.summary.symbol_code;
                dataSymbols[i] = dataSymbolRaw.split("_")[0];
                
                dataImages[i] = icons[dataSymbols[i]];
            }
            /* console.log(dataTemperatures);
            console.log(dataHours);
            console.log(dataImages); */
            updateChart(dataHours, dataTemperatures, dataImages);
            console.log()
        }

        function updateTemperatures(){
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", transferComplete);
            oReq.open("GET", "resources/weather.json");
            oReq.send();
        }
        
        (function(){
            updateTemperatures();
            setInterval(updateTemperatures,600*1000);
        })();


    }
}
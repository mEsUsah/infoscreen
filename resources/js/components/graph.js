import Chart from '../../../node_modules/chart.js/dist/Chart.js';

const clearsky = new Image();
clearsky.src = 'resources/icons/clearsky.svg';
const cloudy = new Image();
cloudy.src = 'resources/icons/cloudy.svg';
const fair = new Image();
fair.src = 'resources/icons/fair.svg';
const fog = new Image();
fog.src = 'resources/icons/fog.svg';
const heavyrain = new Image();
heavyrain.src = 'resources/icons/rain.svg';
const heavyrainandthunder = new Image();
heavyrainandthunder.src = 'resources/icons/thunderstorm.svg';
const heavyrainshowers = new Image();
heavyrainshowers.src = 'resources/icons/rain.svg';
const heavyrainshowersandthunder = new Image();
heavyrainshowersandthunder.src = 'resources/icons/thunderstorm.svg';
const heavysleet = new Image();
heavysleet.src = 'resources/icons/sleet.svg';
const heavysleetandthunder = new Image();
heavysleetandthunder.src = 'resources/icons/thunderstorm.svg';
const heavysleetshowers = new Image();
heavysleetshowers.src = 'resources/icons/sleet.svg';
const heavysleetshowersandthunder = new Image();
heavysleetshowersandthunder.src = 'resources/icons/thunderstorm.svg';
const heavysnowandthunder = new Image();
heavysnowandthunder.src = 'resources/icons/thunderstorm.svg';
const heavysnowshowers = new Image();
heavysnowshowers.src = 'resources/icons/snow.svg';
const heavysnowshowersandthunder = new Image();
heavysnowshowersandthunder.src = 'resources/icons/thunderstorm.svg';
const lightrain = new Image();
lightrain.src = 'resources/icons/sprinkle.svg';
const lightrainandthunder = new Image();
lightrainandthunder.src = 'resources/icons/thunderstorm.svg';
const lightrainshowers = new Image();
lightrainshowers.src = 'resources/icons/sprinkle.svg'
const lightrainshowersandthunder = new Image();
lightrainshowersandthunder.src = 'resources/icons/thunderstorm.svg';
const lightsleetandthunder = new Image();
lightsleetandthunder.src = 'resources/icons/thunderstorm.svg';
const lightsleetshowers = new Image();
lightsleetshowers.src = 'resources/icons/sprinkle.svg'
const lightsnow = new Image();
lightsnow.src = 'resources/icons/snow.svg';
const lightsnowandthunder = new Image();
lightsnowandthunder.src = 'resources/icons/thunderstorm.svg';
const lightsnowshowers = new Image();
lightsnowshowers.src = 'resources/icons/snow.svg';
const lightssleetshowersandthunder = new Image();
lightssleetshowersandthunder.src = 'resources/icons/thunderstorm.svg';
const partlycloudy = new Image();
partlycloudy.src = 'resources/icons/fair.svg';
const rain = new Image();
rain.src = 'resources/icons/rain.svg';
const rainandthunder = new Image();
rainandthunder.src = 'resources/icons/thunderstorm.svg';
const rainshowers = new Image();
rainshowers.src = 'resources/icons/rain.svg';
const rainshowersandthunder = new Image();
rainshowersandthunder.src = 'resources/icons/thunderstorm.svg';
const sleet = new Image();
sleet.src = 'resources/icons/sleet.svg';
const sleetandthunder = new Image();
sleetandthunder.src = 'resources/icons/thunderstorm.svg';
const sleetshowers = new Image();
sleetshowers.src = 'resources/icons/sleet.svg';
const sleetshowersandthunder = new Image();
sleetshowersandthunder.src = 'resources/icons/thunderstorm.svg';
const snow = new Image();
snow.src = 'resources/icons/snow.svg';
const snowandthunder = new Image();
snowandthunder.src = 'resources/icons/thunderstorm.svg';
const snowshowers = new Image();
snowshowers.src = 'resources/icons/snow.svg';
const snowshowersandthunder = new Image();
snowshowersandthunder.src = 'resources/icons/thunderstorm.svg';




/* Chart.pluginService.register({
    afterUpdate: function(chart) {
        chart.config.data.datasets[0]._meta[0].data[2]._model.pointStyle = cloudy;
    }
}); */


export default {
    _hamburger  : document.querySelector("[data-menu-button]"),
    _menu       : document.querySelector("[data-menu-content]"),
	init() {
        console.log("graph");
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

                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                }
            }
        });
        chart.canvas.parentNode.style.height = '500px';
        chart.canvas.parentNode.style.width = '100%';
        
        function updateChart(timeofday, temperatures){
            chart.data.datasets[0].data = temperatures;
            chart.data.labels = timeofday;
            chart.update();
        };

        function transferComplete(){
            let weatherData = JSON.parse(this.responseText);
            let weatherHours = weatherData.properties.timeseries;
            //console.log(weatherHours);
            let dataTemperatures = [];
            let dataHours = [];
            let dataSymbols = [];
            for (let i = 0; i < 18; i++) {
                dataTemperatures[i] = weatherHours[i].data.instant.details.air_temperature;
                dataHours[i] = new Date(weatherHours[i].time).getHours();
                dataSymbols[i] = weatherHours[i].data.next_1_hours.summary.symbol_code;
            }
            /* console.log(dataTemperatures);
            console.log(dataHours);
            console.log(dataSymbols); */
            updateChart(dataHours, dataTemperatures);
        }

        function updateTemperatures(){
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", transferComplete);
            oReq.open("GET", "resources/weather.json");
            oReq.send();
        }
        
        (function(){
            updateTemperatures();
            setInterval(updateTemperatures,(3600*1000));
        })();


    }
}
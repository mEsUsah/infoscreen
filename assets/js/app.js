
let tday = new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
let tmonth = new Array("Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember");

let calendar = document.getElementsByClassName('calendar__table')[0];
console.log(calendar);

let dateToday = new Date();

Date.prototype.getWeek = function (dowOffset) {
	/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
	
		dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
		var newYear = new Date(this.getFullYear(),0,1);
		var day = newYear.getDay() - dowOffset; //the day of week the year begins on
		day = (day >= 0 ? day : day + 7);
		var daynum = Math.floor((this.getTime() - newYear.getTime() - 
		(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
		var weeknum;
		//if the year starts before the middle of a week
		if(day < 4) {
			weeknum = Math.floor((daynum+day-1)/7) + 1;
			if(weeknum > 52) {
				nYear = new Date(this.getFullYear() + 1,0,1);
				nday = nYear.getDay() - dowOffset;
				nday = nday >= 0 ? nday : nday + 7;
				/*if the next year starts before the middle of
				  the week, it is week #1 of that year*/
				weeknum = nday < 4 ? 1 : 53;
			}
		}
		else {
			weeknum = Math.floor((daynum+day-1)/7);
		}
		return weeknum;
	};
  
function setClock(){
	let d = new Date();
	let nday = d.getDay(), nmonth = d.getMonth(), ndate = d.getDate(), nyear = d.getYear();
	if(nyear<1000) nyear+=1900;
	let nhour=d.getHours(), nmin = d.getMinutes(), nsec = d.getSeconds();

	if(nmin<=9) nmin="0"+nmin;
	if(nsec<=9) nsec="0"+nsec;
	
	document.getElementById("datebox").innerHTML=tday[nday]+" "+ndate+". "+tmonth[nmonth]+" "+nyear;
	document.getElementById('clockbox').innerHTML=nhour+":"+nmin+":"+nsec;
}

function createCalendar(year, month){
	let calendarMonth = new Date(year, month, 0);
	let dayArray = new Array("Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag","Søndag");

	// Create first row in calendar
	let tableHeader = document.createElement("thead");
	let tableHeadRow = document.createElement("tr");
	tableHeader.appendChild(tableHeadRow);
	for (let index = 0; index < 8; index++) {
		let newItem = document.createElement("th");
		if (index == 0) {
			let textNode = document.createTextNode("Week");
			newItem.appendChild(textNode);
			tableHeadRow.appendChild(newItem);
			newItem.classList.add("calendar__table__header__week");
		} else{
			let textNode = document.createTextNode(dayArray[index-1]);
			newItem.appendChild(textNode);
			newItem.classList.add("calendar__table__header");
		}
		tableHeadRow.appendChild(newItem);
	}
	calendar.appendChild(tableHeader);

	// Create firt row of dates
	let daysInMonth = calendarMonth.getDate();
	let lastWeekInMonth = new Date(year, month, daysInMonth).getWeek();
	
	let firstDayNumInMonth = new Date(year, month, 1).getDay();
	let firstWeekNumInMonth = new Date(year, month, 1).getWeek();
	
	let tableBody = document.createElement("tbody");
	let tableBodyRow = document.createElement("tr");
	for (let day = 0; day < firstDayNumInMonth; day++) {
		let newItem = document.createElement("td");
		if (day == 0) {
			let textNode = document.createTextNode(firstWeekNumInMonth);
			newItem.appendChild(textNode);
			newItem.classList.add("calendar__table__weeks");
		}
		tableBodyRow.appendChild(newItem);

	}

	let renderDay = 1;

	for (let day = 1; day <= daysInMonth; day++) {
		if(new Date(year, month, day).getDay() == 1){
			break;
		}
		let newItem = document.createElement("td");
		let textNode = document.createTextNode(day);
		newItem.appendChild(textNode);
		newItem.classList.add("calendar__table__days");
		tableBodyRow.appendChild(newItem);
		renderDay++;
		
	}
	tableBody.appendChild(tableBodyRow);

	//Create the rest of the table

	for (let index = firstWeekNumInMonth; index < lastWeekInMonth; index++) {
		let newRow = document.createElement("tr");
		let newWeek = document.createElement("td");
		let renderWeek = new Date(year, month, renderDay).getWeek();
		let newWeekText = document.createTextNode(renderWeek);
		newWeek.appendChild(newWeekText);
		newWeek.classList.add("calendar__table__weeks");
		newRow.appendChild(newWeek);
		for (let index = 0; index < 7; index++) {
			let newItem = document.createElement("td");
			if(renderDay <= daysInMonth){
				let textNode = document.createTextNode(renderDay);
				newItem.appendChild(textNode);
			}
			newItem.classList.add("calendar__table__days");
			newRow.appendChild(newItem);
			renderDay++;
			if(new Date(year, month, renderDay).getDay() == 1){
				break;
			}
		}
		tableBody.appendChild(newRow);
	}
	calendar.appendChild(tableBody);
}

window.onload=function(){
	setClock();
	createCalendar(2020,0);
	setInterval(setClock,1000);
}


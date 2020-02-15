let dateToday = new Date();
let monthToday = dateToday.getMonth();
let dateInMonth = dateToday.getDate();

Date.prototype.getWeek = function (dayOfWeek) {
	/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
	
		dayOfWeek = typeof(dayOfWeek) == 'int' ? dayOfWeek : 0; //default dayOfWeek to zero
		var newYear = new Date(this.getFullYear(),0,1);
		var day = newYear.getDay() - dayOfWeek; //the day of week the year begins on
		day = (day >= 0 ? day : day + 7);
		var daynum = Math.floor((this.getTime() - newYear.getTime() - 
		(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
		var weeknum;
		//if the year starts before the middle of a week
		if(day < 4) {
			weeknum = Math.floor((daynum+day-1)/7) + 1;
			if(weeknum > 52) {
				nYear = new Date(this.getFullYear() + 1,0,1);
				nday = nYear.getDay() - dayOfWeek;
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
	//let tday = new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
	
	let d = new Date();
	let ndate = d.getDate();

	let nhour=d.getHours(), nmin = d.getMinutes(), nsec = d.getSeconds();

	if(nmin<=9) nmin="0"+nmin;
	if(nsec<=9) nsec="0"+nsec;

	// Update the clock
	document.getElementById('clockbox').innerHTML=nhour+":"+nmin+":"+nsec;

	// if newly set date is not the same as the global date, update the calendar
	if(dateInMonth != ndate){
		updateCalendar("calendar1", d);
	}
}

function updateCalendar(calendarId, date){
	let tmonth = new Array("Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember");
	let nmonth = date.getMonth(), nyear = date.getFullYear();
	
	// Clear calendar and create a new bases on the new date
	clearCalendar(calendarId);
	createCalendar(date.getFullYear(), date.getMonth(), calendarId);

	// Update the Calendar headline with the new date
	document.getElementById("datebox").innerHTML=tmonth[nmonth]+" "+nyear;

	// Set the global date variable to new date.
	dateToday = date;
	dateInMonth = dateToday.getDate();
	
	// Mark the new date on the new calendar
	pickCalendarDate((dateToday.getDate()), "data-date");
}


function createCalendar(year, month, calendarId){
	let calendar = document.getElementById(calendarId);
	let calendarMonth = new Date(year, month+1, 0);
	console.log(month);
	//let dayArray = new Array("Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag","Søndag");
	let dayArray = new Array("Man","Tir","Ons","Tors","Fre","Lør","Søn");

	function addDay(day){
		let newItem = document.createElement("td");
		if(renderDay <= daysInMonth){
			let textNode = document.createTextNode(day);
			newItem.appendChild(textNode);
		}
		let dataNode = document.createAttribute("data-date");
		dataNode.value = day;
		newItem.setAttributeNode(dataNode);
		newItem.classList.add("calendar__table__days");
		if(new Date(year, month, renderDay).getDay() == 0 || new Date(year, month, renderDay).getDay() == 6){
			newItem.classList.add("calendar__table__days--weekend");
		}
		return newItem;
	}

	let tableWrapper = document.createElement("table");
	let tableHeader = document.createElement("thead");
	tableWrapper.classList.add("calendar__table");
	let dataNode = document.createAttribute("data-month");
	dataNode.value = month;
	tableWrapper.setAttributeNode(dataNode);

	// Create Headline row in calendar
	let tableHeadRow = document.createElement("tr");
	tableHeader.appendChild(tableHeadRow);
	for (let index = 0; index < 8; index++) {
		let newItem = document.createElement("th");
		if (index == 0) {
			//let textNode = document.createTextNode("Uke");
			//newItem.appendChild(textNode);
			tableHeadRow.appendChild(newItem);
			newItem.classList.add("calendar__table__header__week");
		} else{
			let textNode = document.createTextNode(dayArray[index-1]);
			newItem.appendChild(textNode);
			newItem.classList.add("calendar__table__header");
			if(index > 5){
					newItem.classList.add("calendar__table__days--weekend");
			}
		}
		tableHeadRow.appendChild(newItem);
	}
	tableWrapper.appendChild(tableHeader);

	// Create firt row of dates

	let daysInMonth = calendarMonth.getDate();
	console.log(daysInMonth);
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
		tableBodyRow.appendChild(addDay(renderDay));
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
			newRow.appendChild(addDay(renderDay));
			renderDay++;
			if(new Date(year, month, renderDay).getDay() == 1){
				break;
			}
		}
		tableBody.appendChild(newRow);
	}
	tableWrapper.appendChild(tableBody);
	calendar.appendChild(tableWrapper);
}

function pickCalendarDate(date, dataAttribute){
	let allDates = document.querySelectorAll("[" + dataAttribute + "]");
	let selectedDate = document.querySelector("[" + dataAttribute + "='" + date + "']");
	let activeClassName = "calendar__table__days--active";

	allDates.forEach(element => {
		element.classList.remove(activeClassName);
	});
	selectedDate.classList.add(activeClassName);
}

function clearCalendar(calendarId){
	console.log("clear");
	const parent = document.getElementById(calendarId);
	while(parent.firstChild){
		parent.firstChild.remove();
	}
}
// Used for debuging only.
function setToday(year, month, date){
	let tmonth = new Array("Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember");
	dateToday = new Date(year, month, date);
	dateInMonth = dateToday.getDate();
	document.getElementById("datebox").innerHTML=tmonth[dateToday.getMonth()]+" "+dateToday.getFullYear();
	clearCalendar("calendar1");
	createCalendar(dateToday.getFullYear(), dateToday.getMonth(), "calendar1");
	pickCalendarDate(dateToday.getDate(), "data-date");
}

window.onload=function(){
	setClock();
	createCalendar(dateToday.getFullYear(), dateToday.getMonth(), "calendar1");
	pickCalendarDate((dateToday.getDate()), "data-date");
	setInterval(setClock,1000);
}


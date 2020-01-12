
  tday = new Array("Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag");
  tmonth = new Array("Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember");
  
  function GetClock(){
	var d = new Date();
	var nday = d.getDay(), nmonth = d.getMonth(), ndate = d.getDate(), nyear = d.getYear();
	if(nyear<1000) nyear+=1900;
	var nhour=d.getHours(), nmin = d.getMinutes(), nsec = d.getSeconds();
	
	if(nmin<=9) nmin="0"+nmin;
	if(nsec<=9) nsec="0"+nsec;
	
	document.getElementById("datebox").innerHTML=tday[nday]+" "+ndate+". "+tmonth[nmonth]+" "+nyear;
	document.getElementById('clockbox').innerHTML=nhour+":"+nmin+":"+nsec;
  }
  
  window.onload=function(){
	GetClock();
	setInterval(GetClock,1000);
  }
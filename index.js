function reversestr(str) {
    // var char = str.split('');
    // var rvr = char.reverse();
    // var rvrstr = rvr.join('');
    // return rvrstr;
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var rvr = reversestr(str);
    return str === rvr;
}

function Datetostr(date) {
    var datestr = {day: '', month: '', year: ''};

    if(date.day < 10){
        datestr.day = '0' + date.day;
    }
    else{
        datestr.day = date.day.toString();
    }
    if(date.month < 10){
        datestr.month = '0' + date.month;
    }
    else{
        datestr.month = date.month.toString();
    }

    datestr.year = date.year.toString();

    return datestr;
}


function getallDateFormats(date) {
    var dateStr = Datetostr(date);


    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy , mmddyyyy, yyyymmdd, ddmmyy, mmddyy,yymmdd];
}

function CheckpaliAllDateFormat(date) {
    var pali = getallDateFormats(date);
    var ispali = false;
    for (let i = 0; i < pali.length; i++) {
        if(isPalindrome(pali[i])){
            ispali = true;
            break;
        }
        
    }
    return ispali;
}


function IsLeapYear(year) {
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return false;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(IsLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
            else{
                if(day > 28){
                    day = 1;
                    month++;
                }
            }
        }
    }
    else{
        if(day > daysinMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}


function NextPaliDate(date) {
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var ispali = CheckpaliAllDateFormat(nextDate);
        if(ispali){
            break;
        }
        nextDate = getNextDate(nextDate)
    }

    return [count , nextDate];
}

var inp = document.querySelector('#input');
var but = document.querySelector('#btn');
var out = document.querySelector('#output');


function clickHandler(e) {
    var bdystr = inp.value;

  if(Number(inp.value) === 0){
    out.style.color = 'red';
    out.innerText = "please enter date";

  }
  else{
      if(bdystr !== ''){
          var seplist = bdystr.split('-');
          var date = {
              day : Number(seplist[2]),
              month : Number(seplist[1]),
              year: Number(seplist[0])
            }
        }
        var ispalindrome = CheckpaliAllDateFormat(date);
        if(ispalindrome){
            out.style.color = 'Green';

            out.innerText = 'Yay! your birthday is a palindrome...😊😍';
        }
        else{
            var [cnt, nextdate] = NextPaliDate(date);
            out.style.color = 'white';

            out.innerText = `The next palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year}, you missed it by ${cnt} days! 🙂`;
        }
    }
}




but.addEventListener("click", clickHandler);


import "./styles.css";

var day = document.getElementById("day");
var enter = document.getElementById("enter");
var res = document.getElementById("res");

enter.addEventListener("click", handleEnter);

function makeArray(date) {
  return date.split("-");
}

function getAllPermutation(date) {
  let a = makeArray(date);
  return [
    a[2] + a[1] + a[0],
    a[1] + a[2] + a[0],
    a[0] + a[1] + a[2],
    a[2] + a[1] + a[0].slice(-2),
    a[1] + a[2] + a[0].slice(-2),
    a[0].slice(-2) + a[1] + a[2]
  ];
}

function getReverse(str) {
  return str.split("").reverse().join("");
}

function checkPalindrome(str) {
  return str === getReverse(str);
}

function checkAllDates(date) {
  let f = false;
  let arr = getAllPermutation(date);
  for (let i = 0; i < arr.length; i += 1) {
    if (checkPalindrome(arr[i])) {
      f = true;
      break;
    }
  }
  return f;
}

function leapyear(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

function nextDate(date) {
  let d = makeArray(date);
  let day = parseInt(d[2], 10);
  let month = parseInt(d[1], 10);
  let year = parseInt(d[0], 10);

  var daysInMonth = [
    31,
    leapyear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];
  if (day === daysInMonth[month - 1]) {
    day = 1;
    month = month + 1;
  } else {
    day = day + 1;
  }
  if (month > 12) {
    year = year + 1;
    month = 1;
  }
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

function handleEnter() {
  if (checkAllDates(day.value)) {
    res.innerHTML = "Your birthdate is a palindrome!";
  } else {
    let date = day.value;
    let nextPalin = 0;
    while (1) {
      date = nextDate(date);
      if (checkAllDates(date)) break;
      nextPalin += 1;
    }
    res.innerHTML = `Missed by ${
      nextPalin + 1
    } day(s), try again after rebirth idk`;
  }
}

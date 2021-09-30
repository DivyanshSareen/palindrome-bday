import "./styles.css";

// getting all DOM elements
var day = document.getElementById("day");
var enter = document.getElementById("enter");
var res = document.getElementById("res");

enter.addEventListener("click", handleEnter);

// function to get array of day, month and year.
function makeArray(date) {
  return date.split("-");
}

// function to get array of all permutations of a given date
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

// returns reversed array
function getReverse(str) {
  return str.split("").reverse().join("");
}

// checks if the a string is palindrome or not
function checkPalindrome(str) {
  return str === getReverse(str);
}

// checks whether any of the permutations of a given date is a palindrome
function checkAllDates(date) {
  let f = false; // flag assuming none of the strings will be a palindrome
  let arr = getAllPermutation(date); // getting all permutations of a date
  for (let i = 0; i < arr.length; i += 1) {
    // checking each permutation
    if (checkPalindrome(arr[i])) {
      f = true;
      break;
    }
  }
  // returns false if no string was palindrome
  return f;
}

// check leap year
function leapyear(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

// calculates next date
function nextDate(date) {
  let d = makeArray(date); // converting date to array format discussed above
  // separating dat, month and year from array
  let day = parseInt(d[2], 10);
  let month = parseInt(d[1], 10);
  let year = parseInt(d[0], 10);

  // storing days in each month as an aray
  var daysInMonth = [
    31,
    // leap year has 29 days!
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
  // if day is the last date of month
  if (day === daysInMonth[month - 1]) {
    day = 1;
    month = month + 1;
  } else {
    day = day + 1;
  }
  // new year!
  if (month > 12) {
    year = year + 1;
    month = 1;
  }
  // reconstructing the yyyy-mm-dd format.
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

// callback function that handles "click" event.
function handleEnter() {
  // checks if the date is palindrome
  if (checkAllDates(day.value)) {
    res.innerHTML = "Your birthdate is a palindrome!";
  } else {
    // finds the next palindrome date
    let date = day.value;
    let nextPalin = 0; // number of days to palindrome
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

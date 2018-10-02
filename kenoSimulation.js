
var generateRandomNum = function () {
  let arrNum = [];

  while (arrNum.length !== 6) {
    let Num = Math.floor((Math.random() * 58) + 1);
    if (!arrNum.includes(Num)) {
      arrNum.push(Num);
    }
  }

  return arrNum.sort(function (a, b) { return a - b });
}

var compareResult = function (arrNum, arrJackpotValue) {
  let result = [];

  arrNum.forEach(function (numItem) {
    arrJackpotValue.forEach(function (item) {
      if (numItem === item) {
        result.push(numItem);
      }
    });
  });

  return result;
}

var printOutput = function (matchNum, arrNum) {
  let num = '';
  let style = [];

  arrNum.forEach(function (item) {
    style.push(`${matchNum.includes(item) ? 'color:red; font-weight:900;' : 'color:blue; font-weight:normal;'}`)
    num += "%c" + item + " ";
  });

  console.warn(num, ...style);
}

var jackpot = function () {
  var times = 0;
  let arrNum = [], arrJackpotValue = generateRandomNum();

  console.log('%c' + arrJackpotValue.join(' ') + ' - jackpot numbers', 'font-weight:900');

  let tid = setInterval(function () {
    times++;
    arrNum = generateRandomNum();

    let result = compareResult(arrNum, arrJackpotValue);

    if (result.length < 4) {
      // console.log('[' + times + ']');
      // console.log(...arrNum);
      // console.log(...arrJackpotValue);
    }
    else if (result.length < arrNum.length) {
      console.warn('[' + times + ']');
      printOutput(result, arrJackpotValue);
      printOutput(result, arrNum);
    }
    else if (result.length === arrNum.length) {
      console.error('[' + times + ']');
      console.error(...arrJackpotValue);
      console.error(...arrNum);
      console.error('hit jackpot!', arrNum);
      console.error('done - ' + times + ' times')
      clearInterval(tid);
    }

    if (times % 1000 === 0) {
      console.log('[' + times + ']');
    }
  }, 5);

}

jackpot();
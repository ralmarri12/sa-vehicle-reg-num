# Saudi Arabia Vehicle Registration Number
This package made to solve the issue of converting plate number from English to Arabic letters and digits.

### Installing

Installing:
```shell
$ npm i --save sa-vehicle-reg-num
```

### Usage

#### Letters
```js
const saVRN = require('sa-vehicle-reg-num');
console.log(getArLetters('هدد١٢٣٤'));
// returns هـ د د

console.log(getArLetters('1234ddh'));
// returns هـ د د

console.log(getEnLetters('1234ddh'));
// returns D D H

console.log(getEnLetters('هدد١٢٣٤'));
// returns D D H
```

#### Digits
```js
const saVRN = require('sa-vehicle-reg-num');
console.log(getArNumbers('1234ddh'));
// returns ١ ٢ ٣ ٤

console.log(getArNumbers('هدد١٢٣٤'));
// returns ١ ٢ ٣ ٤

console.log(getEnNumbers('1234ddh'));
// returns 1 2 3 4

console.log(getEnNumbers('هدد١٢٣٤'));
// returns 1 2 3 4
```

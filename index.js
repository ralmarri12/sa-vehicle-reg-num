const allowedLettersMapWithEnKey = {
    'A': 'ا',
    'B': 'ب',
    'J': 'ح',
    'D': 'د',
    'R': 'ر',
    'S': 'س',
    'X': 'ص',
    'T': 'ط',
    'E': 'ع',
    'G': 'ق',
    'K': 'ك',
    'L': 'ل',
    'Z': 'م',
    'N': 'ن',
    'H': 'هـ',
    'U': 'و',
    'V': 'ى',
};

const allowedLettersMapWithArKey = {
    'ا': 'A',
    'ب': 'B',
    'ح': 'J',
    'د': 'D',
    'ر': 'R',
    'س': 'S',
    'ص': 'X',
    'ط': 'T',
    'ع': 'E',
    'ق': 'G',
    'ك': 'K',
    'ل': 'L',
    'م': 'Z',
    'ن': 'N',
    'ه': 'H', // Ar representation should be 'هـ'
    'و': 'U',
    'ى': 'V',
};

const arNumbers = [
    '٠',
    '١',
    '٢',
    '٣',
    '٤',
    '٥',
    '٦',
    '٧',
    '٨',
    '٩',
];

const _removeSpaces = function (str) {
    return str.replace(/\s/g, '');
}
const _getDigits = function (plateNumber) {
    return _removeSpaces(plateNumber).match(/\d+|[٠-٩]/g).join('');
}


const _getLetters = function (plateNumber) {
    return _removeSpaces(plateNumber).replace(/\d+|[٠-٩]/g, '');
}

const getEnLetters = function (plateNumber) {
    const letters = _getLetters(plateNumber);
    const englishRegx = /^[a-zA-Z]+$/;
    if (englishRegx.test(letters)) {
        return letters.toUpperCase().replace(/\s/g, '');
    }

    let stringBuilider = [];
    for (const letterIt of letters.split('')) {
        if (letterIt == 'ـ') { continue; }
        const value = allowedLettersMapWithArKey[letterIt];
        if (value == undefined) {
            throw new Error(`Invalid letter ${letterIt}`);
        }
        stringBuilider.push(value);
    }
    return stringBuilider.reverse().join('');
}

const getArLetters = function (plateNumber) {
    const letters = _getLetters(plateNumber).toUpperCase();
    const englishRegx = /^[a-zA-Z]+$/;
    if (englishRegx.test(letters)) {
        let stringBuilider = [];
        for (const letterIt of letters.split('')) {
            let value = '';
            if (letterIt == 'H') { value += 'ـ' }
            value = allowedLettersMapWithEnKey[letterIt];
            if (value == undefined || value == 'ـ') {
                throw new Error(`Invalid letter ${letterIt}`);
            }
            stringBuilider.push(value);
        }
        return stringBuilider.reverse().join(' ');
    }

    let stringBuilider = [];

    for (const letterIt of letters.split('')) {
        if (letterIt == 'ـ') { continue; }
        if (letterIt == 'ه') {
            stringBuilider.push('هـ')
        } else {
            stringBuilider.push(letterIt);
        }
    }

    return stringBuilider.join(' ');
}

//  هـ د د ١ ٢ ٣ ٤
//  1 2 3 4 D D H

// console.log("- getArLetters('هدد١٢٣٤')");
// console.log(getArLetters('هدد١٢٣٤'));

// console.log("- getArLetters('1234ddh')");
// console.log(getArLetters('1234ddh'));


// console.log("- getEnLetters('1234ddh')");
// console.log(getEnLetters('1234ddh'));

// console.log("- getEnLetters('هدد١٢٣٤')");
// console.log(getEnLetters('هدد١٢٣٤'));



const getArNumbers = function (plateNumber) {

    const arNumRegex = /^[٠-٩]+$/;
    const numbers = _getDigits(plateNumber);
    if (arNumRegex.test(numbers)) {
        return numbers.replace(/\s/g, '').split('').join(' ');
    }

    let stringBuilider = [];
    for (const itt of numbers.split('')) {
        if (arNumbers[itt] == undefined) {
            throw new Error(`Invalid number format at ${itt}`);
        }
        stringBuilider.push(arNumbers[itt]);
    }

    return stringBuilider.join(' ');
}

const getEnNumbers = function (plateNumber) {
    const arNumRegex = /^[٠-٩]+$/;
    const numbers = _getDigits(plateNumber);
    if (arNumRegex.test(numbers)) {

        let stringBuilider = [];
        for (const itt of numbers.split('')) {
            const value = arNumbers.indexOf(itt);
            if (value == undefined) {
                throw new Error(`Invalid number format at ${itt}`);
            }
            stringBuilider.push(value);
        }

        return stringBuilider.join(' ');
    }

    return numbers.replace(/\s/g, '').split('').join(' ');

}

// console.log("- getArNumbers('1234ddh')");
// console.log(getArNumbers('1234ddh'));

// console.log("- getArNumbers('هدد١٢٣٤')");
// console.log(getArNumbers('هدد١٢٣٤'));


// console.log("- getEnNumbers('1234ddh')");
// console.log(getEnNumbers('1234ddh'));

// console.log("- getEnNumbers('هدد١٢٣٤')");
// console.log(getEnNumbers('هدد١٢٣٤'));


module.exports = {
    getEnLetters,
    getArLetters,
    getArNumbers,
    getEnNumbers
}
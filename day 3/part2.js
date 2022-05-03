const fs = require('fs');
const path = require('path');
const arr = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().trim().split("\n");
let bitLength = arr[0].length;

let numbers = arr.map(str => str.split('').map(Number));

function sumIndex(arr, index) {
    let sum = 0;
    for (el of arr) {
        sum += el[index];
    }
    return sum;
}

function removeElements(arr, index, value) {
    return (arr.filter(number => number[index] != value));
}

function getRating(removeMoreCommon) {
    let tempArr = [...numbers];
    while (tempArr.length > 1) {
        for (let i = 0; i < bitLength; i++) {
            let digitToRemove = (sumIndex(tempArr, i) >= tempArr.length / 2) ^ removeMoreCommon ? 0 : 1;
            tempArr = removeElements(tempArr, i, digitToRemove);
            if (tempArr.length == 1) {
                break;
            }
        }
    }
    return tempArr[0];
}

const oxyRating = parseInt(getRating(false).join(''), 2);
const scrubRating = parseInt(getRating(true).join(''), 2);
const lifeSupRating = oxyRating * scrubRating;

console.log("life support rating is " + lifeSupRating);
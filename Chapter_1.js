// 1.1 Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

// using a set
// O(n) time and O(n) space
const checkUnique = (str) => {
  if(str.length > 128) return false; // assuming ASCII, 128-char limit

  const cache = new Set();
  for(let i = 0; i < str.length; i++) {
    if(cache.has(str[i])){
      return false;
    } else {
      cache.add(str[i]);
    }
  }
  return true;
}


// 1.2 Check Permutation: Given two strings, write a method to decide if one is a permutation of the other.

const checkPermutation = (strToCheck, strToCheckAgainst) => {
  const dictionary = {};

  for(let i = 0; i < strToCheckAgainst.length; i++) {
    if(strToCheckAgainst[i] in dictionary) {
      dictionary[strToCheckAgainst[i]]++;
    } else {
      dictionary[strToCheckAgainst[i]] = 1;
    }
  }

  for(let j = 0; j < strToCheck.length; j++) {
    if(!dictionary[strToCheck[j]]) {
      return false;
    } else {
      dictionary[strToCheck[j]]--;
    }
  }

  const totalCount = Object.values(dictionary).reduce((acc = 0, val) => acc + val);
  return totalCount === 0 ? true : false;
}

// 1.3 URLify: Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string.

// quick JS implementation
const URLifyQuick = (str, length) => {
  return str.split(' ').join('%20');
}

// actual implementation
const URLify = (str, length) => {
  const arr = [];
  for(let i = 0; i < str.length; i++) {
    if(str[i] !== ' ') {
      arr.push(str[i]);
    } else {
      arr.push('%20');
    }
  }
  return arr.join('');
}

// 1.4 Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palindrome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.

const palindromePermutation = (str) => {
  const cacheOfOddLetters = new Set();
  for(let i = 0; i < str.length; i++) {
    if(cacheOfOddLetters.has(str[i])) {
      cacheOfOddLetters.delete(str[i]);
    } else {
      cacheOfOddLetters.add(str[i]);
    }
  }

  return cacheOfOddLetters.size <= 1;
}

// 1.5 One Away: There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.

const checkReplaceChar = (strToCheck, strToCheckAgainst) => {
  let diff = 0;
  for(let i = 0; i < strToCheck.length; i++) {
    if(strToCheck[i] !== strToCheckAgainst[i]) {
      diff++;
      if(diff > 1) return false;
    }
  }
  return diff <= 1;
}

const checkAdditionOrDeletion = (shortStr, longStr) => {
  let p1 = 0,
      p2 = 0,
      count = 0;
  while(p1 < shortStr.length && p2 < longStr.length) {
    while(shortStr[p1] !== longStr[p2]) {
      count++;
      if(count > 1) return false;
      p2++;
    }
    p2++;
    p1++;
  }
  return true;
}

const oneAway = (strToCheck, strToCheckAgainst) => {
  if(Math.abs(strToCheck.length - strToCheckAgainst.length) > 1) return false;
  if(strToCheck.length === strToCheckAgainst.length) {
    return checkReplaceChar(strToCheck, strToCheckAgainst);
  } else {
    if(strToCheck.length < strToCheckAgainst.length) {
      return checkAdditionOrDeletion(strToCheck, strToCheckAgainst);
    } else {
      return checkAdditionOrDeletion(strToCheckAgainst, strToCheck);
    }
  }
}

// 1.6 String Compression: Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the compressed string would not become smaller than the original string, your method should return the original string. You can assume the string only has uppercase and lowercase letters (a-z).

const stringCompression = (str) => {
  if(!str.length) return str;

  const arr = [str[0]];
  let index = 1,
      count = 1;
  while(index < str.length) {
    if(str[index] === str[index-1]) {
      count++;
    } else {
      arr.push(count);
      arr.push(str[index]);
      count = 1;
    }
    index++;
  }
  arr.push(count);
  return arr.length < str.length ? arr.join('') : str;
}

// 1.7 Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

const rotateMatrix = (matrix) => {
  for(let layer = 0; layer < matrix.length/2; layer++) {
    let start = layer,
        end = matrix.length - layer - 1;
    for(i = start; i < end; i++) {
      let offset = i - start,
          left = matrix[end - offset][start];

      // bottom to left
      matrix[end - offset][start] = matrix[end][end - offset];

      // right to bottom
      matrix[end][end - offset] = matrix[i][end]

      // top to right
      matrix[i][end] = matrix[start][i];

      // left to top
      matrix[start][i] = left;
    }
  }
  return matrix;
}

const matrix = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]];

// 1.8 Zero Matrix: Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

const zeroMatrix = (matrix) => {
  const zeroRows = {};
  const zeroCols = {};

  for(let row = 0; row < matrix.length; row++) {
    for(let col = 0; col < matrix[row].length; col++) {
      if(matrix[row][col] === 0) {
        zeroCols[col] = true;
        zeroRows[row] = true;
      }
    }
  }

  Object.keys(zeroRows).forEach(zeroRow => {
    matrix[zeroRow] = matrix[zeroRow].map(val => 0)
  });

  Object.keys(zeroCols).forEach(zeroCol => {
    matrix.map(row => {
      row[zeroCol] = 0;
      return row;
    })
  });

  return matrix;
}

// 1.9 String Rotation: Assume you have a method isSubstring which checks if one word is a substring of another. Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring (eg. "waterbottle" is a rotation of "erbottlewat")

const isSubstring = function() {
  let calledCount = 0;

  return function(str, strToCheckAgainst) {
    if(!calledCount) {
      calledCount++;
      return strToCheckAgainst.indexOf(str) >= 0 ? true : false;
    }
  }
}

const stringRotation = (str, strToCheckAgainst) => {
  if(str.length !== strToCheckAgainst.length || !str.length) return false;
  const checkSubstring = new isSubstring();
  const testString = str + str;
  return checkSubstring(strToCheckAgainst, testString);
}

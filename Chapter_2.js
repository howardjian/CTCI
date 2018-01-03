// Implementing a Singly Linked List in JS

function Node(val) {
  this.data = val;
  this.next = null;
  // doubly linked list
  // this.prev = null;
}

Node.prototype.appendToTail = function(val) {
  const newNode = new Node(val);
  let next = this;
  while(next.next !== null) {
    next = next.next;
  }
  next.next = newNode;
}

Node.prototype.removeFromTail = function() {
  let next = this;
  while(next.next !== null) {
    if(next.next.next === null) {
      next.next = null;
    } else {
      next = next.next;
    }
  }
}

// 2.1 Remove Dups: Write code to remove duplicates from an unsorted linked list.

const removeDupes = (head) => {
  const seenVals = {};
  seenVals[head.data] = head.data;

  let prev = head,
      curr = head.next;
  while(curr !== null) {
    if(!(curr.data in seenVals)) {
      seenVals[curr.data] = curr.data;
      prev.next = curr;
      prev = prev.next;
    }
    curr = curr.next
  }
  return head;
}

// 2.2 Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.

const findKthToLastNode = (head, n) => {
  let firstCopy = new Node();
  let secondCopy = new Node();

  firstCopy.next = head;
  secondCopy.next = head;
  let next = firstCopy.next,
      secondNext = secondCopy.next,
      count = 0;

  while(count < n && next !== null) {
    count++;
    next = next.next;
  }

  if(next === null) return head;

  while(next !== null) {
    secondNext = secondNext.next;
    next = next.next;
  }

  return secondNext;
}

// 2.3 Delete Middle Node: Implement an algorithm to delete a node in the middle (ie. any node but the first and last node, not necessarily the exact middle) of a singly linked list, given only access to the node.

const deleteMiddleNode = (node) => {

  while(node.next !== null) {
    node.data = node.next.data;
    node = node.next;
  }
  node.data = null;
}

// 2.4 Partition: Write code to partition a linked list around value x, such that all nodes less than x come before all nodes greater than or equal to x. If x is contained within the list, the values of x only need to be after the elements less than x (see below). The partition element x can appear anywhere in the "right partition"; it does not need to appear between the left and right partitions.

// Example:
// Input: 3 -> 5 -> 8 -> 10 -> 2 -> 1 (partition = 5)
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8

const partition = (node, n) => {
  const smaller = [],
        larger = [];
  let curr = node;

  while(curr !== null) {
    if(curr.data < n) {
      smaller.push(curr.data);
    } else {
      larger.push(curr.data);
    }
    curr = curr.next;
  }

  larger.push(n);

  curr = node;
  while(smaller.length) {
    curr.data = smaller.pop();
    curr = curr.next;
  }

  while(larger.length) {
    if(curr.next === null) {
      let newNode = new Node(larger.pop());
      curr.next = newNode;
    } else {
      curr.data = larger.pop();
    }
    curr = curr.next;
  }

  return node;
}

// 2.5 Sum Lists: You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the 1's digit is at the head of the list. Write a function that adds to numbers and returns the sum as a linked list.

const sumLists = (node1, node2) => {
  let next1 = node1,
      next2 = node2,
      sumNode = new Node(),
      sumNext = sumNode,
      carry = 0,
      sum = 0;

  while(next1 !== null && next2 !== null) {
    sum = carry + next1.data + next2.data;
    carry = 0;
    if(sum >= 10) {
      carry++;
      sum-=10;
    }
    sumNext.next = new Node(sum);
    sumNext = sumNext.next;
    next1 = next1.next;
    next2 = next2.next;
  }

  while(next1 !== null) {
    sum = carry + next1.data;
    carry = 0;
    if(sum >= 10) {
      carry++;
      sum-=10;
    }
    sumNext.next = new Node(sum);
    sumNext = sumNext.next;
    next1 = next1.next;
  }

  while(next2 !== null) {
    sum = carry + next2.data;
    carry = 0;
    if(sum >= 10) {
      carry++;
      sum-=10;
    }
    sumNext.next = new Node(sum);
    sumNext = sumNext.next;
    next2 = next2.next;
  }
  if(carry) {
    sumNext.next = new Node(carry);
    carry--;
  }
  return sumNode.next;
}

// Recursive Approach
const sumListsRecursive = (node1, node2, carry = 0) => {
  if(node1 === null && node2 === null && carry === 0) {
    return null;
  }

  let value = carry;
  carry = 0;
  if(node1 !== null) {
    value += node1.data;
  }

  if(node2 !== null) {
    value += node2.data;
  }

  if(value >= 10) {
    value -= 10;
    carry++;
  }

  const resultLinkedList = new Node(value);
  resultLinkedList.next = sumListsRecursive(node1 === null ? null : node1.next, node2 === null ? null : node2.next, carry);
  return resultLinkedList;
}


// 2.6 Palindrome: Implement a function to check if a linked list is a palindrome

// O(n) time complexity, O(n) space
const isPalindrome = (node) => {
  const arr = [];
  let pointer = node;
  while(pointer !== null) {
    arr.push(pointer.data);
    pointer = pointer.next;
  }

  let p1 = 0, p2 = arr.length-1;
  while(p1 <= p2) {
    if(arr[p1] !== arr[p2]) {
      return false;
    }
    p1++;
    p2--;
  }
  return true;
}

// const reverseAndCloneLinkedList = (node) => {
//   let head = null;
//
//   while(node !== null) {
//     let newNode = new Node(node.data);
//     newNode.next = head;
//     head = newNode;
//     node = node.next;
//   }
//
//   return head;
// }


// 2.7 Intersection: Given two (singly) linked lists, determine if the two lists intersect. Return the intersecting node. Note that the intersection is defined based on reference, not value. That is, if the kth node of the first linked list is the exact same node (by reference) as the jth node of the second linked list, then they are intersecting.

const intersection = (node1, node2) => {
  let next1 = node1,
      next2 = node2,
      length1 = 0,
      length2 = 0;

  while(next1.next !== null) {
    length1++;
    next1 = next1.next;
  }

  while(next2.next !== null) {
    length2++;
    next2 = next2.next;
  }

  if(next1 !== next2) {
    return false;
  }

  let diff = length1 - length2;
  next1 = node1;
  next2 = node2;
  if(diff > 0) {
    while(diff) {
      next1 = next1.next;
      diff--;
    }
  }

  if(diff < 0) {
    while(diff < 0) {
      next2 = next2.next;
      diff++;
    }
  }

  while(next1 !== next2) {
    next1 = next1.next;
    next2 = next2.next;
  }
  return next1;
}

// 2.8 Loop Detection: Given a circular linked list, implement an algorithm that returns the node at the beginning of the Loop

// K steps to beginning of loop

const loopDetection = (head) => {
  let p1 = head.next,
      p2 = head.next.next;

  // find collision
  while(p2 !== p1) {
    p1 = p1.next;
    p2 = p2.next.next;
  }

  p1 = head;
  while(p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }

  return p2;
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
const start = new Node(4)
head.next.next.next = start;
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);
head.next.next.next.next.next.next.next = new Node(8);
head.next.next.next.next.next.next.next.next = new Node(9);
head.next.next.next.next.next.next.next.next.next = new Node(10);
head.next.next.next.next.next.next.next.next.next.next = new Node(11);
head.next.next.next.next.next.next.next.next.next.next.next = start



console.log(loopDetection(head));

// 3.1 Three in One: Describe how you could use a single array to implement three stacks

/*
  Depending on what data we are receiving [eg. a range of integers that can be categorized or uncategorized data that will just fill up each stack until memory allocation for each stack is maxed out]
*/


// 3.2 Stack Min: How would you design a stack, which in addition to push and pop, has a function min which returns the minimum element? Push, pop and min should all operate in O(1) time.

// function Node(data) {
//   this.data = data;
//   this.min = data;
// }
//
// class Stack {
//   constructor(node) {
//     this.last = node;
//     this.min = node.data;
//   }
//
//   remove() {
//     if(this.last === null) throw new Error('Stack is empty');
//     const oldLast = this.last.data;
//     this.last = this.last.next;
//
//     if(this.min === oldLast.data) {
//       this.min = this.last.min;
//     }
//
//     return oldLast;
//   }
//
//   push(node) {
//     if(!this.last) {
//       this.last = node;
//       this.min = node.data;
//     } else {
//       const oldLast = this.last;
//       node.next = oldLast;
//       this.last = node;
//
//       if(node.data < this.min) {
//         this.min = node.data;
//       }
//       node.min = this.min;
//     }
//   }
//
//   min() {
//     return this.min
//   }
// }

// 3.3 Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be composed of several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks.push() and SetOfStacks.pop() should behave identially to a single stack.

function Node(data) {
  this.data = data;
  this.next = null;
}

function Stack() {
  this.currentSize = 0;
  this.last = null;
}

Stack.prototype.push = function(node) {
  this.currentSize++;
  if(this.last !== null) {
    const oldLast = this.last;
    node.next = oldLast;
  }
  this.last = node;
}

Stack.prototype.pop = function() {
  if(!this.currentSize) throw new Error('nothing in stack');
  this.currentSize--;
  const oldLast = this.last;
  this.last = this.last.next;
  return oldLast;
}

function SetOfStacks(maxSize) {
  this.maxSize = maxSize;
  this.stacks = [];
  this.currentStack = null;
}

SetOfStacks.prototype.push = function(node) {
  if(!this.currentStack || this.currentStack.currentSize === this.maxSize) {
    const newStack = new Stack();
    this.stacks.push(newStack);
    this.currentStack = newStack;
  }
  this.currentStack.push(node);
}

SetOfStacks.prototype.pop = function() {
  if(!this.stacks.length) throw new Error('There are no stacks!');
  if(!this.currentStack.currentSize) {
    this.stacks.pop();
    if(!this.stacks.length) {
      throw new Error('There are no stacks left!');
    }
    this.currentStack = this.stacks[this.stacks.length-1];
  }
  return this.currentStack.pop();
}

// FOLLOW UP: Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.

SetOfStacks.prototype.popAt = function(index) {
  if(index >= this.stacks.length || index < 0) throw new Error('invalid index');
  this.stacks[index].pop();
}


// 3.4 Queue via Stacks: Implement a MyQueue class which implements a queue using two stacks.

function MyQueue() {

}


const test = new SetOfStacks(2);
const newNode1 = new Node(1);
const newNode2 = new Node(2);
const newNode3 = new Node(3);

test.push(newNode1);
test.push(newNode2);
test.push(newNode3);
test.pop();
test.pop();

console.log(test);

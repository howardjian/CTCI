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

Stack.prototype.peek = function() {
  if(this.last === null) return null;
  return this.last.data;
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
  this.oldStack = new Stack();
  this.newStack = new Stack();
}

MyQueue.prototype.push = function(node) {
  this.newStack.push(node);
}

MyQueue.prototype.pop = function() {
  if(!this.oldStack.currentSize) {
    while(this.newStack.currentSize) {
      this.oldStack.push(this.newStack.pop());
    }
  }
  this.oldStack.pop();
}

// 3.5 Sort Stack: Write a program to sort a stack such that the smallest items are on the top. You can use an additional temporary stack, but you may not copy the elements into any other data structure (such as an empty array). The stack supports the following operations: push, pop, peek, and isEmpty.

const sortStack = (stack) => {
  if(stack.currentSize <= 1) return stack;
  const tempStack = new Stack();

  while(stack.currentSize) {
    if(!tempStack.currentSize) {
      tempStack.push(stack.pop())
    } else {
      const topOfUnsortedStackVal = stack.peek();
      const topOfTempStackVal = tempStack.peek();
      if(topOfUnsortedStackVal <= topOfTempStackVal) {
        const topOfStack = stack.pop();
        while(tempStack.currentSize) {
          stack.push(tempStack.pop());
        }
        stack.push(topOfStack);
      } else {
        tempStack.push(stack.pop());
      }
    }
  }

  while(tempStack.currentSize) {
    stack.push(tempStack.pop());
  }
  return stack;
}

// 3.6 Animal Shelter: An animal shelter, which holds only dogs and cats, oeprates on a strictly "first in, first out" basis. People must adopt either the oldest (based on arrival time) of all animals at the shelter, or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type). They cannot select which specific animal they would like. Create the data structures to maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog, dequeueCat. You may use the built-in LinkedList data structure.

function animalStack() {
  this.currentSize = 0;
  this.first = null;
  this.last = null;
}

animalStack.prototype.peek = function() {
  if(!this.first) return Number.POSITIVE_INFINITY;
  return this.first.arrivalTime;
}

animalStack.prototype.push = function(animal) {
  this.currentSize++;
  if(!this.first) {
    this.first = animal;
    this.last = animal;
  } else {
    const oldLast = this.last;
    oldLast.next = animal;
    this.last = animal;
  }
}

animalStack.prototype.pop = function() {
  if(!this.first) throw new Error('nothing in the stack');

  this.currentSize--;
  const poppedAnimal = this.first;

  if(this.first === this.last) {
    this.first = null;
    this.last = null;
  } else {
    this.first = poppedAnimal.next;
  }

  return poppedAnimal
}


class Animal {
  constructor() {
    this.next = null;
  }
}

class Dog extends Animal {
  constructor() {
    super();
    this.type = 'dog';
  }
}

class Cat extends Animal {
  constructor() {
    super();
    this.type = 'cat';
  }
}

class AnimalShelter {
  constructor() {
    this.dogs = new animalStack();
    this.cats = new animalStack();
    this.fakeTime = 0;
  }

  enqueue(animal) {
    animal.arrivalTime = this.fakeTime;
    this.fakeTime++;

    if(animal.type === 'cat') {
      this.cats.push(animal);
    }
    if(animal.type === 'dog') {
      this.dogs.push(animal);
    }
  }

  dequeueAny() {
    const dogDate = this.dogs.peek();
    const catDate = this.cats.peek();

    if(dogDate <= catDate || !this.cats.currentSize) {
      return this.dogs.pop();
    } else {
      return this.cats.pop();
    }
  }

  dequeueCat() {
    return this.cats.pop();
  }

  dequeueDog() {
    return this.dogs.pop();
  }

}

const kitty = new Cat();
const puppy = new Dog();
const kitty1 = new Cat();
const puppy1 = new Dog();

const test = new AnimalShelter();
test.enqueue(kitty);
test.enqueue(puppy);
test.enqueue(kitty1);

console.log(test.dequeueCat());

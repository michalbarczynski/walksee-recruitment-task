// var worker = new Worker('Worker.js');

// worker.addEventListener('message', function(e) {
//   alert('otrzymano odpowiedź: ' + e.data);
// }, false);

// wyslanie wiadomosci start
// worker.postMessage('start');

// wyslanie wiadomosci stop
// worker.postMessage('stop');

class Element {
  prev;
  next;
  value;
}

class Queue {
index = 0;
elements = [];

  constructor(name) {
    this.name = name;

    const queueString = window.localStorage.getItem(name);

    if (queueString) {
      let tempQfromStorage = JSON.parse(queueString);
      this.elements = tempQfromStorage.elements;
      this.index = tempQfromStorage.index;
    } else {
      window.localStorage.setItem(name, JSON.stringify(this));
    }
}

    push() {
    const element = new Element();
    element.value ='Element-' + this.index++;

    const lastElement = this.elements[this.elements.length - 1];
    
    if(this.elements.length > 0) {
      lastElement.next = this.elements.length;
      element.prev = this.elements.length - 1;
    } 
    this.elements.push(element);
    this.saveToStorage(this);
    }

    pop() {
      this.elements.pop();
      this.saveToStorage(this.name);
    }
    
    show_head() {
      return this.elements[0];
    }
    
    show_tail() {
      return this.elements[this.elements.length - 1];
    }

    saveToStorage(queue) {
      window.localStorage.setItem(queue.name, JSON.stringify(queue));
    }
};

const fifo = new Queue('Bob'); 

fifo.push();
fifo.push();
fifo.pop();
console.log(fifo.pop());



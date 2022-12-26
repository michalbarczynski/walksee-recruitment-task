var worker = new Worker('Worker.js');

worker.addEventListener('message', function(e) {
  alert('otrzymano odpowiedź: ' + e.data);
}, false);

// wyslanie wiadomosci start
worker.postMessage('start');

// wyslanie wiadomosci stop
worker.postMessage('stop');


class Queue {
  constructor(name) {
    this.name = name;

    const isQueueNotExists = !window.localStorage.getItem(name);

    if(isQueueNotExists) {
      
      window.localStorage.setItem(name, '');
      this.tail = undefined;
      this.head = undefined;
      this.lastIndex = undefined;

    } else {
      const headValue = window.localStorage.getItem(name + 'Head');
      const tailValue = window.localStorage.getItem(name + 'Tail');

      this.tail = tailValue;
      this.head = headValue;
    }
  }

    push_head(element) {
      const lastIndexKey = this.name + 'LastIndex';
      const randomDigitToBeAddedToUniqueID = Math.floor(Math.random() * 10);
      const lastIndexValue = window.localStorage.getItem(lastIndexKey);
      const lastIndexValueWithDigitAdded = lastIndexValue + randomDigitToBeAddedToUniqueID;

      if(lastIndexValue == undefined) {
        const startIndex = randomDigitToBeAddedToUniqueID;
        const elementKey = this.name + 'Element-' + startIndex + '-Value';

        window.localStorage.setItem(elementKey, element);
        window.localStorage.setItem(lastIndexKey, startIndex);
      } else {
        
        const elementKey = this.name + 'Element-' + lastIndexValueWithDigitAdded + '-Value';

        const elementPrevKey = this.name + 'Element-' + lastIndexValueWithDigitAdded + '-Prev';
        const elementPrevValue = this.name + 'Element-' + lastIndexValue;

        window.localStorage.setItem(elementPrevKey, elementPrevValue);
        window.localStorage.setItem(elementKey, element);
        window.localStorage.setItem(lastIndexKey, lastIndexValueWithDigitAdded);

        window.localStorage.setItem(this.name + 'Element-' + lastIndexValue + '-Next', elementKey.replace('-Value', ''));
      }

      const headValue = this.name + 'Element-' + lastIndexValueWithDigitAdded;
      this.head = this.name + 'Head';
      window.localStorage.setItem(this.name + 'Head', headValue);
    }

    pop_tail() {
      const tailKey = this.name + 'Tail';
      const tailValue = window.localStorage.getItem(tailKey);

      if(tailValue == undefined)
        return 

      const prevValue = window.localStorage.getItem(tailValue + '-Prev');

      window.localStorage.removeItem(tailValue + '-Value');
      window.localStorage.removeItem(tailValue + '-Prev');
      window.localStorage.removeItem(tailValue + '-Next');

      window.localStorage.setItem(tailValue, prevValue);
      window.localStorage.removeItem(prevValue + '-Next');

      this.tail = tailKey;
    }
    
    head() {
      window.localStorage.getItem(this.head);
    }
    
    tail() {
      window.localStorage.getItem(this.tail);
    }
};

const fifo = new Queue('Bob'); 

fifo.push_head('test');
fifo.pop_tail();

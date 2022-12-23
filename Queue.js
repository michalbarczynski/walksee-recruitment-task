class Queue {
  constructor(name) {
    this.name = name;

    const isQueueNotExists = !window.localStorage.getItem(name);

    if(isQueueNotExists) {
      // stworz pusta kolejke
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
    // enkapsulacje privatami dodac
    push_head(element) {
      const lastIndexValueKey = this.name + 'LastIndex';
      const lastIndexValue = window.localStorage.getItem(lastIndexValueKey);
      const lastIndexValueIncrementedByOne = lastIndexValue + 1;
      
      if(lastIndexValue == undefined) {
        const startIndex = 0;
        const elementValueKey = this.name + 'Element-' + startIndex + '-Value';

        window.localStorage.setItem(elementValueKey, element);
        window.localStorage.setItem(lastIndexValueKey, startIndex);
      } else {
        
        const elementValueKey = this.name + 'Element-' + lastIndexValueIncrementedByOne + '-Value';

        const elementPrevKey = this.name + 'Element-' + lastIndexValueIncrementedByOne + '-Prev';
        const elementPrevValue = this.name + 'Element-' + lastIndexValue;

        window.localStorage.setItem(elementPrevKey, elementPrevValue);
        window.localStorage.setItem(elementValueKey, element);
        window.localStorage.setItem(lastIndexValueKey, lastIndexValueIncrementedByOne);

        window.localStorage.setItem(this.name + 'Element-' + lastIndexValue + '-Next', elementValueKey.replace('-Value', ''));
      }

      const headValue = this.name + 'Element-' + lastIndexValueIncrementedByOne;
      this.head = this.name + 'Head';
      window.localStorage.setItem(this.name + 'Head', headValue);
    }

    pop_tail() {
      const tailValueKey = this.name + 'Tail';
      const tailValue = window.localStorage.getItem(tailValueKey);

      if(tailValue == undefined)
        return 

      const prevValue = window.localStorage.getItem(tailValue + '-Prev');

      window.localStorage.removeItem(tailValue + '-Value');
      window.localStorage.removeItem(tailValue + '-Prev');
      window.localStorage.removeItem(tailValue + '-Next');

      window.localStorage.setItem(tailValue, prevValue);
      window.localStorage.removeItem(prevValue + '-Next');

      this.tail = tailValueKey;
    }
    
    head() {
      window.localStorage.getItem(this.head);
    }
    
    tail() {
      window.localStorage.getItem(this.tail);
    }
};

//someFifoMethodName = ('nazwa metoedy zaimplementowanej na localForage')
const fifo = new Queue('Bob'); 


document.querySelector('.push').addEventListener('click', fifo.push_head(new Date().toString()));
document.querySelector('.remove').addEventListener('click', fifo.pop_tail());

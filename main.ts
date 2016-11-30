import { Observable} from 'rxjs/Observable';
import {  Observer } from 'rxjs/Observer';
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/from";

let numbers = [1, 2, 7];
let source = Observable.from(numbers);


source.subscribe(
    value => console.log(value),
    error => console.log(error),
    () => console.log("Complete")
)

class MyNumberObserver implements Observer<number> {
    prefix :string;
    constructor(private _prefix : string ){
        this.prefix = _prefix;
    }
    next(value) {
        console.log(this.prefix + value);
    }
    error(e) {
        console.log(this.prefix + e);
    }
    complete() {
        console.log(this.prefix + " Completed!");
    }
}



source.subscribe(new MyNumberObserver("1"));


let source2 = Observable.create(
    observer => {
        for (let n of numbers) {
            // if(n === 2){
            //     observer.error("Something went wrong");
            // }
            observer.next(n);
        }
        observer.complete();
    }
)
source2.subscribe(
    value => console.log("2" + value),
    error => console.log(error),
    () => console.log("Completed 2")
);

let source3 = Observable.create(
    observer =>{
    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);
        if(index < numbers.length){
            setTimeout(produceValue, 200);
        }else{
            observer.complete();
        }
    }
    produceValue();
    } 
).map(n => n *2)
.filter(n => n > 2);

source3.subscribe(new MyNumberObserver("3"));

let eventSource = Observable.fromEvent(document, "mousemove")
.map((e:MouseEvent) => <MouseEvent>e );


class MyMouseEventObserver implements Observer<MouseEvent> {
    prefix :string;
    constructor(private _prefix : string ){
        this.prefix = _prefix;
    }
    next(value) {
        console.log(value);
    }
    error(e) {
        console.log( e);
    }
    complete() {
        console.log(" Completed!");
    }
}
eventSource.subscribe(new MyMouseEventObserver("5"));
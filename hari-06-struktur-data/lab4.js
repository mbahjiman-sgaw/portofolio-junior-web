import { Queue } from "./structures.js";


const queue = new Queue();
queue.enqueue("Jersey Home");
queue.enqueue("Jersey Away");
queue.enqueue("Jersey Third");
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
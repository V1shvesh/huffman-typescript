interface IPQNode<T> {
  item: T;
  priority: number;
}

export default class PriorityQueue<T> {
  constructor(public queue: Array<IPQNode<T>>= [] ) {}

  /**
   * enqueue
   */
  public enqueue(item: T, priority: number) {
    let i = 0;
    const node = {item, priority};

    while (i < this.queue.length && node.priority > this.queue[i].priority) {
      i++;
    }

    this.queue.splice(i, 0, node);
  }

  /**
   * dequeue
   */
  public dequeue() {
    return this.queue.shift().item;
  }

  /**
   * length
   */
  public length() {
    return this.queue.length;
  }

}

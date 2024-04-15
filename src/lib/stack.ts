class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined; // Stack underflow
    }
    return this.items.pop();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined; // Stack is empty
    }
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }
}

export default Stack;

import { expect, describe, beforeEach, it, test } from 'vitest';
import Stack from '../stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it('should push items onto the stack', () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(1);
  });

  it('should pop items from the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);

    const poppedItem = stack.pop();
    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it('should return undefined when popping from an empty stack', () => {
    expect(stack.pop()).toBeUndefined();
  });

  it('should return the top item without removing it', () => {
    stack.push(1);
    stack.push(2);

    const topItem = stack.peek();
    expect(topItem).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it('should return undefined when peeking from an empty stack', () => {
    expect(stack.peek()).toBeUndefined();
  });

  it('should check if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  it('should return the size of the stack', () => {
    expect(stack.size()).toBe(0);
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });
});

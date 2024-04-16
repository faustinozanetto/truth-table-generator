import { expect, test } from 'vitest';
import Stack from '../stack';

test('isEmpty should return true for an empty Stack', () => {
  const stack = new Stack<number>();
  expect(stack.isEmpty()).toBe(true);
});

test('isEmpty should return false for a non empty Stack', () => {
  const stack = new Stack<number>();
  stack.push(10);
  expect(stack.isEmpty()).toBe(false);
});

test('pop should the first element in a Stack and then return empty', () => {
  const stack = new Stack<number>();
  stack.push(10);
  expect(stack.pop()).toBe(10);
  expect(stack.isEmpty()).toBe(true);
});

test('peek should return the first element in a Stack and then return non empty', () => {
  const stack = new Stack<number>();
  stack.push(10);
  expect(stack.peek()).toBe(10);
  expect(stack.isEmpty()).toBe(false);
});

test('size should return 0 for an empty Stack', () => {
  const stack = new Stack<number>();
  expect(stack.size()).toBe(0);
});

test('size should return 1 for Stack with one element', () => {
  const stack = new Stack<number>();
  stack.push(10);
  expect(stack.size()).toBe(1);
});

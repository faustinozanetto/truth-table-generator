import { expect, test } from 'vitest';
import { extractVariablesFromExpression, generateExpressionTree, shuntingYardTokenization } from '../expressions.lib';

const EMPTY_EXPRESSION = '';
const NON_EMPTY_EXPRESSION = '(A∧B)';

test('should return an empty array of variables from an empty expression', () => {
  const variables = extractVariablesFromExpression(EMPTY_EXPRESSION);
  expect(variables.length).toBe(0);
});

test('should return an array of variables from an expression', () => {
  const variables = extractVariablesFromExpression(NON_EMPTY_EXPRESSION);
  expect(variables).toStrictEqual(['A', 'B']);
});

test('should return an empty array of tokens from an empty expression', () => {
  const tokens = shuntingYardTokenization(EMPTY_EXPRESSION);
  expect(tokens.length).toBe(0);
});

test('should return an array of tokens from an expression', () => {
  const tokens = shuntingYardTokenization(NON_EMPTY_EXPRESSION);
  expect(tokens).toContainEqual({ value: 'A', type: 'variable' });
  expect(tokens).toContainEqual({ value: 'B', type: 'variable' });
  expect(tokens).toContainEqual({ value: '∧', type: 'operator' });
});

test('should return null tree for an empty tokens array', () => {
  const tokens = shuntingYardTokenization(EMPTY_EXPRESSION);
  const tree = generateExpressionTree(tokens);
  expect(tree).toBeNull();
});

test('should return a tree for an tokens array', () => {
  const tokens = shuntingYardTokenization(NON_EMPTY_EXPRESSION);
  const tree = generateExpressionTree(tokens);

  expect(tree).toBeDefined();
  expect(tree).toStrictEqual({
    leftNode: {
      leftNode: null,
      rightNode: null,
      data: {
        expression: 'A',
        type: 'variable',
        value: false,
      },
    },
    rightNode: {
      leftNode: null,
      rightNode: null,
      data: {
        expression: 'B',
        type: 'variable',
        value: false,
      },
    },
    data: { expression: '∧', type: 'operator', value: false },
  });
});

expect('should return false for');

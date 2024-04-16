import { describe, expect, it, test } from 'vitest';
import {
  evaluateExpression,
  extractVariablesFromExpression,
  generateExpressionTree,
  shuntingYardTokenization,
} from '../expressions.lib';
import { ExpressionNode, ExpressionToken, TruthTable } from 'types/app.types';

const EMPTY_EXPRESSION = '';
const NON_EMPTY_EXPRESSION = '(A∧B)';

describe('extractVariablesFromExpression', () => {
  it('should extract variables from the expression', () => {
    const expression = 'A∧B∨C'; // Example expression
    const variables = extractVariablesFromExpression(expression);
    expect(variables).toEqual(['A', 'B', 'C']);
  });

  it('should handle duplicate variables', () => {
    const expression = 'A∧B∨A'; // Example expression with duplicate variable
    const variables = extractVariablesFromExpression(expression);
    expect(variables).toEqual(['A', 'B']);
  });

  it('should handle empty expression', () => {
    const expression = ''; // Empty expression
    const variables = extractVariablesFromExpression(expression);
    expect(variables).toEqual([]);
  });

  it('should handle expression with no variables', () => {
    const expression = '∧∨'; // Expression with no variables
    const variables = extractVariablesFromExpression(expression);
    expect(variables).toEqual([]);
  });

  it('should handle expression with spaces', () => {
    const expression = 'A ∧ B ∨ C'; // Expression with spaces
    const variables = extractVariablesFromExpression(expression);
    expect(variables).toEqual(['A', 'B', 'C']);
  });
});

describe('shuntingYardTokenization', () => {
  it('should tokenize a simple expression', () => {
    const expression = 'A∧B∨C';
    const expectedTokens: ExpressionToken[] = [
      { type: 'variable', value: 'A' },
      { type: 'operator', value: '∧' },
      { type: 'variable', value: 'B' },
      { type: 'operator', value: '∨' },
      { type: 'variable', value: 'C' },
    ];
    const tokens = shuntingYardTokenization(expression);
    expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
  });

  it('should handle parentheses correctly', () => {
    const expression = '(A∧B)∨C';
    const expectedTokens: ExpressionToken[] = [
      { type: 'variable', value: 'A' },
      { type: 'operator', value: '∧' },
      { type: 'variable', value: 'B' },
      { type: 'operator', value: '∨' },
      { type: 'variable', value: 'C' },
    ];
    const tokens = shuntingYardTokenization(expression);
    expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
  });

  it('should handle complex expressions', () => {
    const expression = 'A∧(B∨C)';
    const expectedTokens: ExpressionToken[] = [
      { type: 'variable', value: 'A' },
      { type: 'operator', value: '∧' },
      { type: 'variable', value: 'B' },
      { type: 'variable', value: 'C' },
      { type: 'operator', value: '∨' },
    ];
    const tokens = shuntingYardTokenization(expression);
    expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
  });

  it('should handle empty expression', () => {
    const expression = '';
    const expectedTokens: ExpressionToken[] = [];
    const tokens = shuntingYardTokenization(expression);
    expect(tokens).toEqual(expect.arrayContaining(expectedTokens));
  });
});

describe('generateExpressionTree', () => {
  it('should generate expression tree for a simple expression', () => {
    const tokens: ExpressionToken[] = [
      { type: 'variable', value: 'A' },
      { type: 'variable', value: 'B' },
      { type: 'operator', value: '∧' },
    ];
    const expectedTree: ExpressionNode = {
      leftNode: {
        data: { expression: 'A', type: 'variable' },
        leftNode: null,
        rightNode: null,
      },
      rightNode: {
        data: { expression: 'B', type: 'variable' },
        leftNode: null,
        rightNode: null,
      },
      data: { expression: '∧', type: 'operator' },
    };
    const tree = generateExpressionTree(tokens);
    expect(tree).toEqual(expectedTree);
  });

  it('should handle unary operators correctly', () => {
    const tokens: ExpressionToken[] = [
      { type: 'variable', value: 'A' },
      { type: 'operator', value: '¬' },
      { type: 'variable', value: 'B' },
      { type: 'operator', value: '∧' },
    ];

    const expectedTree: ExpressionNode = {
      leftNode: {
        leftNode: { data: { expression: 'A', type: 'variable' }, leftNode: null, rightNode: null },
        rightNode: null,
        data: { expression: '¬', type: 'operator' },
      },
      rightNode: {
        data: { expression: 'B', type: 'variable' },
        leftNode: null,
        rightNode: null,
      },
      data: { expression: '∧', type: 'operator' },
    };
    const tree = generateExpressionTree(tokens);
    expect(tree).toEqual(expectedTree);
  });

  it('should handle empty tokens array', () => {
    const tokens: ExpressionToken[] = [];
    const tree = generateExpressionTree(tokens);
    expect(tree).toBeNull();
  });
});

describe('evaluateExpression', () => {
  test('evaluates single variable', () => {
    const node: ExpressionNode = {
      data: { expression: 'A', type: 'variable' },
      leftNode: null,
      rightNode: null,
    };
    expect(evaluateExpression(node, { A: true })).toBe(true);
    expect(evaluateExpression(node, { A: false })).toBe(false);
  });

  test('evaluates unary operator ¬', () => {
    const node: ExpressionNode = {
      data: { expression: '¬', type: 'operator' },
      leftNode: { data: { expression: 'A', type: 'variable' }, leftNode: null, rightNode: null },
      rightNode: null,
    };
    expect(evaluateExpression(node, { A: true })).toBe(false);
    expect(evaluateExpression(node, { A: false })).toBe(true);
  });

  test('evaluates binary operators', () => {
    // Test with logical AND operator ∧
    let node: ExpressionNode = {
      data: { expression: '∧', type: 'operator' },
      leftNode: { data: { expression: 'A', type: 'variable' }, leftNode: null, rightNode: null },
      rightNode: { data: { expression: 'B', type: 'variable' }, leftNode: null, rightNode: null },
    };
    expect(evaluateExpression(node, { A: true, B: true })).toBe(true);
    expect(evaluateExpression(node, { A: true, B: false })).toBe(false);
    expect(evaluateExpression(node, { A: false, B: true })).toBe(false);
    expect(evaluateExpression(node, { A: false, B: false })).toBe(false);

    // Test with logical OR operator ∨
    node = {
      data: { expression: '∨', type: 'operator' },
      leftNode: { data: { expression: 'A', type: 'variable' }, leftNode: null, rightNode: null },
      rightNode: { data: { expression: 'B', type: 'variable' }, leftNode: null, rightNode: null },
    };
    expect(evaluateExpression(node, { A: true, B: true })).toBe(true);
    expect(evaluateExpression(node, { A: true, B: false })).toBe(true);
    expect(evaluateExpression(node, { A: false, B: true })).toBe(true);
    expect(evaluateExpression(node, { A: false, B: false })).toBe(false);

    // Test with implication operator →
    node = {
      data: { expression: '→', type: 'operator' },
      leftNode: { data: { expression: 'A', type: 'variable' }, leftNode: null, rightNode: null },
      rightNode: { data: { expression: 'B', type: 'variable' }, leftNode: null, rightNode: null },
    };
    expect(evaluateExpression(node, { A: true, B: true })).toBe(true);
    expect(evaluateExpression(node, { A: true, B: false })).toBe(false);
    expect(evaluateExpression(node, { A: false, B: true })).toBe(true);
    expect(evaluateExpression(node, { A: false, B: false })).toBe(true);
  });
});

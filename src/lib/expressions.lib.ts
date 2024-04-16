import { ExpressionNode, ExpressionToken, TruthTable, TruthTableEntry } from 'types/app.types';
import { OPERATORS_PRECEDENCE, OPERATOR_REGEX, VARIABLE_REGEX } from './characters.lib';
import Stack from './stack';

export const generateTruthTableFromExpression = (
  expression: string
): {
  variables: string[];
  truthTable: TruthTable;
} => {
  if (expression === '') {
    return {
      variables: [],
      truthTable: [],
    };
  }

  // Tokenize expression and generate expression tree.
  const tokens = shuntingYardTokenization(expression);
  const tree = generateExpressionTree(tokens);

  if (!tree) {
    return {
      variables: [],
      truthTable: [],
    };
  }

  const variables = extractVariablesFromExpression(expression);
  const truthTable: TruthTable = [];

  // Generate all possible combinations of truth values for the variables
  for (let i = 0; i < Math.pow(2, variables.length); i++) {
    const variableValues: TruthTableEntry = {};
    for (let j = 0; j < variables.length; j++) {
      variableValues[variables[j]] = !!(i & (1 << j));
    }

    // Evaluate the expression tree for the current truth values
    const result = evaluateExpression(tree, variableValues);

    // Store the result in the truth table
    truthTable.push({ ...variableValues, Result: result });
  }
  return { variables, truthTable };
};

export const extractVariablesFromExpression = (expression: string): string[] => {
  const variables = new Set<string>();
  expression.split('').forEach((character) => (VARIABLE_REGEX.test(character) ? variables.add(character) : null));

  return Array.from(variables.values());
};

export const shuntingYardTokenization = (expression: string): ExpressionToken[] => {
  const tokens: ExpressionToken[] = [];
  const operatorStack: string[] = [];

  const isOperator = (token: string): boolean => !!token.match(OPERATOR_REGEX);
  const isVariable = (token: string): boolean => !!token.match(VARIABLE_REGEX);

  const peek = (stack: string[]): string => stack[stack.length - 1];

  expression.split('').forEach((token) => {
    if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (peek(operatorStack) !== '(') {
        tokens.push({ type: 'operator', value: operatorStack.pop()! });
      }
      operatorStack.pop(); // Discard '('
    } else if (isOperator(token)) {
      while (OPERATORS_PRECEDENCE[peek(operatorStack)] >= OPERATORS_PRECEDENCE[token]) {
        tokens.push({ type: 'operator', value: operatorStack.pop()! });
      }
      operatorStack.push(token);
    } else if (isVariable(token)) {
      // Assume it's a variable
      tokens.push({ type: 'variable', value: token });
    }
  });

  // Pop remaining operators from the stack
  while (operatorStack.length > 0) {
    tokens.push({ type: 'operator', value: operatorStack.pop()! });
  }

  return tokens;
};

export const generateExpressionTree = (tokens: ExpressionToken[]): ExpressionNode | null => {
  if (tokens.length === 0) return null;

  const stack = new Stack<ExpressionNode>();

  for (const token of tokens) {
    if (token.type === 'variable') {
      const variableNode: ExpressionNode = {
        leftNode: null,
        rightNode: null,
        data: {
          expression: token.value,
          type: 'variable',
          value: false, // Default value for variables
        },
      };
      stack.push(variableNode);
    } else if (token.type === 'operator') {
      if (token.value === '¬') {
        // Ensure there is at least one node on the stack
        if (stack.isEmpty()) {
          throw new Error('Invalid expression: insufficient operands for unary operator');
        }

        const operandNode: ExpressionNode | null = stack.pop() ?? null;

        if (!operandNode) {
          throw new Error('Invalid expression: missing operand for unary operator');
        }

        const operatorNode: ExpressionNode = {
          leftNode: operandNode,
          rightNode: null, // Unary operator does not have a right operand
          data: {
            expression: token.value,
            type: 'operator',
            value: false, // Default value for operators
          },
        };
        stack.push(operatorNode);
      } else {
        // Binary operator
        if (stack.size() < 2) {
          throw new Error('Invalid expression: insufficient operands for binary operator');
        }

        const rightNode: ExpressionNode | null = stack.pop() ?? null;
        const leftNode: ExpressionNode | null = stack.pop() ?? null;

        if (!leftNode || !rightNode) {
          throw new Error('Invalid expression: missing operands for binary operator');
        }

        const operatorNode: ExpressionNode = {
          leftNode,
          rightNode,
          data: {
            expression: token.value,
            type: 'operator',
            value: false, // Default value for operators
          },
        };
        stack.push(operatorNode);
      }
    }
  }

  if (stack.size() !== 1) {
    throw new Error('Invalid expression: expression tree construction failed');
  }

  // The remaining node in the stack is the root of the expression tree
  return stack.pop()!;
};

export const evaluateExpression = (node: ExpressionNode, variableValues: TruthTableEntry): boolean => {
  if (node.data.type === 'variable') {
    return variableValues[node.data.expression];
  } else if (node.data.type === 'operator') {
    if (node.data.expression === '¬') {
      const operandValue = evaluateExpression(node.leftNode!, variableValues);
      return !operandValue; // Negate the operand value
    } else {
      const leftValue = evaluateExpression(node.leftNode!, variableValues);
      const rightValue = evaluateExpression(node.rightNode!, variableValues);

      switch (node.data.expression) {
        case '∧': // AND
          return leftValue && rightValue;
        case '∨': // OR
          return leftValue || rightValue;
        case '→': // Implication
          return !leftValue || rightValue;
      }
    }
  }
  return false;
};

export const isValidExpression = (expression: string): boolean => {
  const stack: string[] = [];

  // Check parentheses matching
  for (const char of expression) {
    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      if (stack.pop() !== '(') {
        return false; // Unmatched closing parenthesis
      }
    }
  }
  if (stack.length !== 0) {
    return false; // Unmatched opening parenthesis
  }

  const operators = expression.match(OPERATOR_REGEX) || [];
  const operands = expression.match(VARIABLE_REGEX) || [];
  if (operators.length !== operands.length - 1) {
    return false; // Invalid operator or operand count
  }

  // Check operator position
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char.match(OPERATOR_REGEX)) {
      // Operator should be preceded by an operand, a closing parenthesis, or the start of the expression
      if (
        i === 0 ||
        (!expression[i - 1].match(VARIABLE_REGEX) && expression[i - 1] !== ')' && expression[i - 1] !== '(')
      ) {
        return false; // Invalid operator position
      }
      // Operator should be followed by an operand, an opening parenthesis, or the end of the expression
      if (
        i === expression.length - 1 ||
        (!expression[i + 1].match(VARIABLE_REGEX) && expression[i + 1] !== '(' && expression[i + 1] !== ')')
      ) {
        return false; // Invalid operator position
      }
    }
  }

  // Variable syntax validation
  if (!operands.every((variable) => variable.length === 1)) {
    return false; // Invalid variable syntax
  }

  return true; // Expression is valid
};

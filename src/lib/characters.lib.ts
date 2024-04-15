import { CharacterData } from 'types/app.types';

export const PARENTHESES_REGEX = /[()]/;
export const OPERATOR_REGEX = /¬|∧|∨|→/;
export const VARIABLE_REGEX = /[A-Z]/;
export const OPERATORS_PRECEDENCE: Record<string, number> = {
  '¬': 3, // Unary negation has the highest precedence
  '∧': 2,
  '∨': 1,
  '→': 1, // Implication operator
  '(': 0, // Parentheses have the lowest precedence
};

export const CHARACTERS: CharacterData[] = [
  {
    name: 'A',
    value: 'A',
  },
  {
    name: 'B',
    value: 'B',
  },
  {
    name: 'C',
    value: 'C',
  },
  {
    name: 'Negation',
    value: '¬',
  },
  {
    name: 'AND',
    value: '∧',
  },
  {
    name: 'OR',
    value: '∨',
  },
  {
    name: 'Implication',
    value: '→',
  },
  {
    name: 'Open Parenthesis',
    value: '(',
  },
  {
    name: 'Close Parenthesis',
    value: ')',
  },
];

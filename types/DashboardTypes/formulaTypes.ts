export interface Variable {
  id: string;
  _id: string;
  feeType: string;
  value: number;
  description: string;
}

export type OperatorType = '+' | '-' | '*' | '/' | '(' | ')';

export type TokenType = 'variable' | 'operator' | 'number';

export interface FormulaToken {
  type: TokenType;
  value: string;
  display: string;
  id: string;
}

export interface Formula {
  id: string;
  name: string;
  tokens: FormulaToken[];
  description: string;
  active: boolean;
}

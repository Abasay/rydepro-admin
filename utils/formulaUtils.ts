import { FormulaToken, OperatorType } from '@/types/DashboardTypes/formulaTypes';

// Function to validate if a token can be added to maintain mathematical correctness
export const canAddToken = (tokens: FormulaToken[], newToken: FormulaToken): boolean => {
  if (tokens.length === 0) {
    // First token should be a variable, number, or open bracket
    return (
      newToken.type === 'variable' ||
      newToken.type === 'number' ||
      (newToken.type === 'operator' && newToken.value === '(')
    );
  }

  const lastToken = tokens[tokens.length - 1];

  // Check based on the type of the new token
  switch (newToken.type) {
    case 'variable':
    case 'number':
      // Can't add variable or number after variable, number or closed bracket
      return lastToken.type === 'operator' && lastToken.value !== ')';

    case 'operator':
      if (newToken.value === '(') {
        // Can add open bracket after operators (except closing bracket) or at the beginning
        return lastToken.type === 'operator' && lastToken.value !== ')';
      } else if (newToken.value === ')') {
        // Can add closing bracket only if there's a matching open bracket
        // And last token is a variable, number or closing bracket
        const openBrackets = tokens.filter((t) => t.value === '(').length;
        const closeBrackets = tokens.filter((t) => t.value === ')').length;
        return (
          openBrackets > closeBrackets &&
          (lastToken.type === 'variable' || lastToken.type === 'number' || lastToken.value === ')')
        );
      } else {
        // Other operators can be added after variables, numbers, or closing bracket
        return lastToken.type === 'variable' || lastToken.type === 'number' || lastToken.value === ')';
      }

    default:
      return false;
  }
};

// Function to check if formula is valid
export const isValidFormula = (tokens: FormulaToken[]): boolean => {
  if (tokens.length === 0) return false;

  // Check for balanced brackets
  let bracketCount = 0;
  for (const token of tokens) {
    if (token.type === 'operator' && token.value === '(') bracketCount++;
    if (token.type === 'operator' && token.value === ')') bracketCount--;
    if (bracketCount < 0) return false; // Unbalanced brackets
  }

  if (bracketCount !== 0) return false; // Unbalanced brackets

  // Check first and last tokens
  const firstToken = tokens[0];
  const lastToken = tokens[tokens.length - 1];

  if (
    (firstToken.type === 'operator' && firstToken.value !== '(') ||
    (lastToken.type === 'operator' && ![')'].includes(lastToken.value as OperatorType))
  ) {
    return false;
  }

  // Check consecutive operators
  for (let i = 0; i < tokens.length - 1; i++) {
    const currentToken = tokens[i];
    const nextToken = tokens[i + 1];

    if (
      currentToken.type === 'operator' &&
      nextToken.type === 'operator' &&
      ![')'].includes(currentToken.value as OperatorType) &&
      !['('].includes(nextToken.value as OperatorType)
    ) {
      return false;
    }
  }

  return true;
};

// Function to check if a token can be removed without breaking mathematical validity
export const canRemoveToken = (tokens: FormulaToken[], indexToRemove: number): boolean => {
  // If there's only one token or empty formula after removal, it's valid
  if (tokens.length <= 1) return true;

  // Create a copy of tokens without the one being removed
  const newTokens = tokens.filter((_, index) => index !== indexToRemove);

  // If formula becomes empty, it's valid (empty is handled separately)
  if (newTokens.length === 0) return true;

  // Check basic mathematical validity of the resulting formula

  // 1. Check brackets balance
  let bracketCount = 0;
  for (const token of newTokens) {
    if (token.type === 'operator' && token.value === '(') bracketCount++;
    if (token.type === 'operator' && token.value === ')') bracketCount--;
    if (bracketCount < 0) return false; // Unbalanced brackets
  }
  if (bracketCount !== 0) return false; // Unbalanced brackets

  // 2. Special cases: removing a token can create invalid operator sequences

  // If we're removing anything except the first or last token
  if (indexToRemove > 0 && indexToRemove < tokens.length - 1) {
    const prevToken = tokens[indexToRemove - 1];
    const nextToken = tokens[indexToRemove + 1];

    // Can't have two consecutive operators unless they are () or )(
    if (prevToken.type === 'operator' && nextToken.type === 'operator') {
      // Allow: (...)
      if (prevToken.value === '(' && nextToken.value === ')') return true;
      // Disallow: +-, */, etc.
      return false;
    }

    // Can't have two consecutive variables/numbers
    if (
      (prevToken.type === 'variable' || prevToken.type === 'number') &&
      (nextToken.type === 'variable' || nextToken.type === 'number')
    ) {
      return false;
    }
  }

  // 3. Check if first and last tokens are valid after removal
  if (newTokens.length > 0) {
    const firstToken = newTokens[0];
    const lastToken = newTokens[newTokens.length - 1];

    // Formula can't start with an operator (except opening bracket)
    if (firstToken.type === 'operator' && firstToken.value !== '(') {
      return false;
    }

    // Formula can't end with an operator (except closing bracket)
    if (lastToken.type === 'operator' && lastToken.value !== ')') {
      return false;
    }
  }

  // If we passed all checks, the removal is valid
  return true;
};

// Function to evaluate the formula with given variables
export const evaluateFormula = (tokens: FormulaToken[], variableValues: Record<string, number>): number => {
  // Convert the tokens to a proper mathematical expression
  let expression = '';
  tokens.forEach((token) => {
    if (token.type === 'variable') {
      const value = variableValues[token.value] ?? 0;
      expression += value;
    } else {
      expression += token.value;
    }
  });

  try {
    // Using Function constructor to evaluate the expression
    // Note: In a production environment, use a safer method for evaluation
    const result = Function(`"use strict"; return (${expression})`)();
    return typeof result === 'number' ? result : 0;
  } catch (error) {
    console.error('Error evaluating formula:', error);
    return 0;
  }
};

// Generate a unique ID for tokens
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

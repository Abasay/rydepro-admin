import React, { useState, useEffect } from 'react';
import { useVariables } from '@/contexts/VariablesContext';
import { FormulaToken, Formula, OperatorType, Variable } from '@/types/DashboardTypes/formulaTypes';
import { canAddToken, isValidFormula, generateId, canRemoveToken } from '@/utils/formulaUtils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/Dashboard/LucideUI/select';

import { X, Plus, Minus, Asterisk, Divide, ChevronRight, ChevronLeft } from 'lucide-react';

import { cn } from '@/utils';
import { toast } from '../../../LucideUI/use-toast';
import { Label } from '../../../LucideUI/label';
import { Badge } from '../../../LucideUI/badge';
import { Button } from '../../../LucideUI/button';

interface FormulaBuilderProps {
  onSave: (formula: Formula) => void;
  onCancel: () => void;
  initialFormula?: Formula;
}

const FormulaBuilder: React.FC<FormulaBuilderProps> = ({ onSave, onCancel, initialFormula }) => {
  const { variables, formulaTokens, setFormulaTokens } = useVariables();
  const [formulaName, setFormulaName] = useState(initialFormula?.name || '');
  // const [formulaTokens, setFormulaTokens] = useState<FormulaToken[]>(initialFormula?.tokens || []);

  const [newVariables, setNewVariables] = useState<Variable[]>([
    ...variables,
    {
      id: '1000',
      feeType: 'distance',
      description: 'Distance in miles/kilometers',
      value: 0,
      _id: '1000',
    },
    {
      id: '1001',
      feeType: 'duration',
      description: 'Duration in minutes/hours',
      value: 0,
      _id: '1001',
    },
  ]);
  const [description, setDescription] = useState(initialFormula?.description || '');
  const [active, setActive] = useState(initialFormula?.active || false);
  const [error, setError] = useState<string | null>(null);

  const operators: { symbol: OperatorType; label: string; icon?: React.ReactNode }[] = [
    { symbol: '+', label: 'Addition', icon: <Plus size={16} /> },
    { symbol: '-', label: 'Subtraction', icon: <Minus size={16} /> },
    { symbol: '*', label: 'Multiplication', icon: <Asterisk size={16} /> },
    { symbol: '/', label: 'Division', icon: <Divide size={16} /> },
    { symbol: '(', label: 'Open Bracket', icon: <ChevronLeft size={16} /> },
    { symbol: ')', label: 'Close Bracket', icon: <ChevronRight size={16} /> },
  ];

  const handleAddVariable = (variableId: string) => {
    const variable = newVariables.find((v) => v.id === variableId);
    if (!variable) return;

    const newToken: FormulaToken = {
      id: generateId(),
      type: 'variable',
      value: variable.feeType,
      display: variable?.feeType?.replace(/_/g, ' '),
    };

    if (canAddToken(formulaTokens, newToken)) {
      setFormulaTokens([...formulaTokens, newToken]);
      setError(null);
    } else {
      setError('Cannot add variable here based on mathematical rules');
    }
  };

  const handleAddOperator = (operator: OperatorType) => {
    const newToken: FormulaToken = {
      id: generateId(),
      type: 'operator',
      value: operator,
      display: operator,
    };

    if (canAddToken(formulaTokens, newToken)) {
      setFormulaTokens([...formulaTokens, newToken]);
      setError(null);
    } else {
      setError(`Cannot add ${operator} here based on mathematical rules`);
    }
  };

  const handleRemoveToken = (id: string) => {
    // Find the token to be removed
    const tokenIndex = formulaTokens.findIndex((token) => token.id === id);
    if (tokenIndex === -1) return;

    // Create a new array without the token
    const updatedTokens = formulaTokens.filter((token) => token.id !== id);

    // Check if removal would make the formula invalid
    if (updatedTokens.length === 0 || canRemoveToken(formulaTokens, tokenIndex)) {
      setFormulaTokens(updatedTokens);
      setError(null);
    } else {
      setError('Removing this token would make the formula mathematically invalid');
      toast({
        title: 'Invalid Operation',
        description: "Removing this token would break the formula's mathematical validity",
        variant: 'destructive',
      });
    }
  };

  const handleSave = () => {
    if (!formulaName) {
      setError('Formula name is required');
      return;
    }

    if (formulaTokens.length === 0) {
      setError('Formula cannot be empty');
      return;
    }

    if (!isValidFormula(formulaTokens)) {
      setError('Formula is not mathematically valid');
      return;
    }

    const formula: Formula = {
      id: initialFormula?.id || generateId(),
      name: formulaName,
      tokens: formulaTokens,
      description,
      active,
    };

    onSave(formula);
    toast({
      title: 'Formula saved',
      description: 'Your formula has been saved successfully',
    });
  };

  const handleReset = () => {
    setFormulaName(initialFormula?.name || '');
    setFormulaTokens(initialFormula?.tokens || []);
    setDescription(initialFormula?.description || '');
    setActive(initialFormula?.active || false);
    setError(null);
  };

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  console.log(variables);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="inline-flex">
          Formula <span className="text-red-500 ml-1">*</span>
        </Label>

        {/* Formula tokens display */}
        <div className="p-4 border rounded-md min-h-16 flex flex-wrap gap-2 items-center">
          {formulaTokens.length > 0 ? (
            formulaTokens.map((token) => (
              <Badge
                key={token.id}
                className={cn(
                  'px-3 py-1 font-medium flex items-center gap-1',
                  token.type === 'variable'
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : token.type === 'operator'
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                )}
              >
                {token.display}
                <button
                  type="button"
                  onClick={() => handleRemoveToken(token.id)}
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))
          ) : (
            <span className="text-gray-400">Enter formula</span>
          )}
        </div>

        {/* Variable selection */}
        <div className="mt-4">
          <Label>Add Variable</Label>
          <Select onValueChange={handleAddVariable}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a variable" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {newVariables.map((variable) => (
                <SelectItem key={variable?.id} value={variable?.id}>
                  {variable?.feeType} ({variable?.description})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Operator buttons */}
        <div className="mt-4">
          <Label>Add Operator</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {operators.map((op) => (
              <Button
                key={op.symbol}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddOperator(op.symbol)}
                className="flex items-center gap-1"
              >
                {op.icon}
                <span>{op.symbol}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default FormulaBuilder;

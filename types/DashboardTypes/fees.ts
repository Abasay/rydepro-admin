export interface FeeValue {
  value1: string;
  value2: string;
}

export interface FeeRow {
  name: string;
  values: FeeValue[];
}

export interface Variable {
  name: string;
  value: string;
}

export interface FeeData {
  id: string;
  variables: Variable[];
  rows: FeeRow[];
}

export interface SectionData {
  id: string;
  category: string;
  backgroundColor: string;
  fees: FeeData[];
}

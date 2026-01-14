export interface KeyDefinition {
  code: string;
  label: string;
  shiftLabel?: string;
  width?: number; // Width multiplier, default is 1 (1u = standard key width)
}

export interface KeyboardLayout {
  name: string;
  mainRows: KeyDefinition[][];
  numpadRows: KeyDefinition[][];
}

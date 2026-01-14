export interface KeyEventEntry {
  id: string;
  type: "keydown" | "keyup" | "keypress";
  code: string;
  key: string;
  timestamp: Date;
  modifiers: {
    shift: boolean;
    ctrl: boolean;
    alt: boolean;
    meta: boolean;
  };
}

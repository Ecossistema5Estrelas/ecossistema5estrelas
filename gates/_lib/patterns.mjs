export const RX = {
  // JS dangerous
  evalCall: /\beval\s*\(/g,
  funcCtor: /\bnew\s+Function\s*\(|\bFunction\s*\(/g,
  timeoutString: /\bsetTimeout\s*\(\s*["'`]| \bsetInterval\s*\(\s*["'`]/g,
  // HTML inline (raw HTML only)
  inlineHandler: /\son[a-z]+\s*=\s*["'][^"']*["']/gi,
  positiveTabIndex: /\btabindex\s*=\s*["']([1-9]\d*)["']/gi,
  // JSX / React
  dangerouslySetInnerHTML: /\bdangerouslySetInnerHTML\s*=\s*\{/g,
  // CSS
  transitionAll: /\btransition\s*:\s*all\b/gi,
  hardcodedColorHex: /#[0-9a-fA-F]{3,8}\b/g,
  cssVar: /var\(--[a-zA-Z0-9\-_]+\)/g,
};

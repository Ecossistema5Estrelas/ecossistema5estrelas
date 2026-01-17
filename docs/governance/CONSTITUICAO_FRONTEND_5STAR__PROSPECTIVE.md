# 📜 CONSTITUIÇÃO FRONTEND 5⭐ — PROSPECTIVA

**Escopo:** HTML, CSS, JavaScript  
**Tipo:** Prospectiva (não retroativa)  
**Status:** Em vigor para novos desenvolvimentos  
**Data (UTC):** 2026-01-17T19:41:22Z

---

## Princípios
- HTML-first
- CSS-first
- Progressive enhancement
- Acessibilidade nativa
- Sem comportamento implícito

---

## ENFORCE NOW

### HTML
one-main-per-page
semantic-landmarks-required
heading-hierarchy-no-skip
label-required-for-inputs
button-not-div
nav-landmarks-required
alt-required-for-images
time-element-for-dates
figure-with-figcaption


### CSS
design-tokens-required
no-magic-values
cascade-controlled
prefers-reduced-motion-supported
no-layout-via-effects
logical-properties-preferred


### JS
html-first-behavior
css-first-presentation
no-inline-js
no-dom-hacks
pure-functions-preferred
explicit-side-effects


---

## ENFORCE LATER

### HTML
breadcrumb-semantic
series-navigation
category-navigation
trail-navigation
dialog-element


### CSS
container-queries
has-selector
advanced-gradients
view-transitions


### JS
web-workers
iterator-helpers
structured-observability
streaming-apis


---

## FORBIDDEN
{
  "process": [
    "implicit-rules",
    "undocumented-conventions",
    "feature-without-constitution",
    "feature-without-gate",
    "change-without-snapshot"
  ],
  "js": [
    "eval",
    "new-function",
    "document-write",
    "dom-hacks",
    "js-fixing-html",
    "js-fixing-css",
    "global-mutable-state",
    "logic-without-audit",
    "inline-event-handlers"
  ],
  "css": [
    "experimental-in-core",
    "layout-via-effects",
    "transition-all",
    "important-indiscriminate",
    "browser-hacks",
    "magic-values",
    "implicit-cascade",
    "vh-layout-mobile"
  ],
  "meta": {
    "type": "prospective",
    "created": "2026-01-17T16:39:34Z",
    "name": "Frontend Constitution — Forbidden",
    "scope": "frontend",
    "version": "1.0"
  },
  "html": [
    "inline-js",
    "inline-css",
    "layout-with-div-only",
    "missing-main",
    "multiple-main",
    "headings-skipped",
    "inputs-without-label",
    "img-without-alt",
    "semantic-tags-ignored",
    "fake-forms"
  ]
}


---

## OBSERVE
{
  "process": [
    "design-system-automation",
    "a11y-auto-remediation",
    "visual-regression-gates",
    "performance-budget-gates"
  ],
  "js": [
    "iterator-helpers",
    "atomics",
    "web-workers-advanced",
    "streams-api",
    "scheduler-posttask",
    "temporal-api"
  ],
  "css": [
    "container-queries",
    "has-selector",
    "margin-trim",
    "view-transitions",
    "advanced-gradients",
    "color-contrast-function",
    "accent-color"
  ],
  "meta": {
    "type": "prospective",
    "created": "2026-01-17T16:40:22Z",
    "name": "Frontend Constitution — Observe",
    "scope": "frontend",
    "version": "1.0"
  },
  "html": [
    "dialog-element",
    "popover-attribute",
    "inert-attribute",
    "details-summary-advanced"
  ]
}


---

## Cláusulas
- Esta constituição não altera a selagem estrutural A1–A4.
- Serve como base exclusiva para os gates futuros.
- Nada entra em produção fora deste contrato.

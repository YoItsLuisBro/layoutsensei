export function generateGridHTML(itemCount = 8) {
  const items = Array.from(
    { length: itemCount },
    (_, i) => `  <div class="item">${i + 1}</div>`
  ).join("\n");
  return `<div class="grid-container">\n${items}\n</div>`;
}

export function generateGridCSS({
  cols,
  colSize,
  rows,
  rowSize,
  gap,
  justifyItems,
  alignItems,
  autoFlow,
}) {
  const r =
    rows > 0 ? `\n  grid-template-rows: repeat(${rows}, ${rowSize});` : "";
  return `/* Container */
.grid-container{
  display:grid;
  grid-template-columns: repeat(${cols}, ${colSize});${r}
  gap:${gap}px;
  justify-items:${justifyItems};
  align-items:${alignItems};
  grid-auto-flow:${autoFlow};
}

/* Items */
.grid-container .item{
  min-height:70px;
  background:#B13BFF;
  color:#F7F5F4;
  display:grid;place-items:center;
  border-radius:10px;
  font:600 14px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}`;
}

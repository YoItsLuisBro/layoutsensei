export function generateFlexHTML(itemCount = 6) {
  const items = Array.from(
    { length: itemCount },
    (_, i) => `  <div class="item">${i + 1}</div>`
  ).join("\n");
  return `<div class="flex-container">\n${items}\n</div>`;
}

export function generateFlexCSS({
  direction,
  wrap,
  justify,
  alignItems,
  alignContent,
  gap,
  itemMinW,
  itemMinH,
}) {
  return `/* Container */
.flex-container{
  display:flex;
  flex-direction:${direction};
  flex-wrap:${wrap};
  justify-content:${justify};
  align-items:${alignItems};
  align-content:${alignContent};
  gap:${gap}px;
}

/* Items */
.flex-container .item{
  flex:0 1 auto;
  min-width:${itemMinW}px;
  min-height:${itemMinH}px;
  background:#FFCC00;
  color:#090040;
  display:grid;place-items:center;
  border-radius:10px;
  font:600 14px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}`;
}

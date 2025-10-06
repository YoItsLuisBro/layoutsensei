import { useMemo, useState } from 'react'
import CodeBlock from '../components/CodeBlock.jsx'
import { generateGridHTML, generateGridCSS } from '../utils/generateGridTemplate.js'

export default function GridBuilder(){
  const [itemCount, setItemCount] = useState(8)
  const [cols, setCols] = useState(4)
  const [colSize, setColSize] = useState('1fr')
  const [rows, setRows] = useState(0)
  const [rowSize, setRowSize] = useState('150px')
  const [gap, setGap] = useState(12)
  const [justifyItems, setJustifyItems] = useState('stretch')
  const [alignItems, setAlignItems] = useState('stretch')
  const [autoFlow, setAutoFlow] = useState('row')

  const html = useMemo(()=>generateGridHTML(itemCount), [itemCount])
  const css = useMemo(()=>generateGridCSS({cols, colSize, rows, rowSize, gap, justifyItems, alignItems, autoFlow}), [cols, colSize, rows, rowSize, gap, justifyItems, alignItems, autoFlow])

  const previewStyle = {
    display:'grid',
    gridTemplateColumns: `repeat(${cols}, ${colSize})`,
    gap: `${gap}px`,
    justifyItems,
    alignItems,
    gridAutoFlow: autoFlow,
    minHeight: 220
  }
  if(rows>0){ previewStyle.gridTemplateRows = `repeat(${rows}, ${rowSize})` }

  const itemStyle = {
    minHeight:'70px',
    background:'#B13BFF',
    color:'#F7F5F4',
    display:'grid',
    placeItems:'center',
    borderRadius:'10px',
    font:'600 14px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  }

  return (
    <section className="container stack">
      <div className="preview-title">
        <strong>Grid Template Creator</strong>
        <span className="items-kbd">{itemCount} items • {cols} cols • gap {gap}px</span>
      </div>

      <div className="grid2">
        <div className="card preview-wrap">
          <div className="preview" style={previewStyle} aria-label="Grid live preview">
            {Array.from({length:itemCount},(_,i)=>(
              <div style={itemStyle} key={i}>{i+1}</div>
            ))}
          </div>

          <div className="grid2">
            <CodeBlock label="HTML" value={html}/>
            <CodeBlock label="CSS" value={css}/>
          </div>
        </div>

        <div className="card">
          <fieldset className="controls">
            <div className="control">
              <label htmlFor="items">Items</label>
              <input id="items" type="number" min="1" max="80" value={itemCount} onChange={e=>setItemCount(+e.target.value||1)} />
            </div>

            <div className="control">
              <label htmlFor="cols">Columns</label>
              <input id="cols" type="number" min="1" max="24" value={cols} onChange={e=>setCols(+e.target.value||1)} />
            </div>

            <div className="control">
              <label htmlFor="colSize">Column size (e.g. 1fr, 200px, minmax(160px,1fr))</label>
              <input id="colSize" value={colSize} onChange={e=>setColSize(e.target.value||'1fr')} />
            </div>

            <div className="control">
              <label htmlFor="rows">Rows (0=auto)</label>
              <input id="rows" type="number" min="0" max="24" value={rows} onChange={e=>setRows(+e.target.value||0)} />
            </div>

            <div className="control">
              <label htmlFor="rowSize">Row size (e.g. 150px, auto, 1fr)</label>
              <input id="rowSize" value={rowSize} onChange={e=>setRowSize(e.target.value||'150px')} />
            </div>

            <div className="control">
              <label htmlFor="gap">Gap (px)</label>
              <input id="gap" type="number" min="0" max="60" value={gap} onChange={e=>setGap(+e.target.value||0)} />
            </div>

            <div className="control">
              <label htmlFor="justifyItems">Justify Items</label>
              <select id="justifyItems" value={justifyItems} onChange={e=>setJustifyItems(e.target.value)}>
                <option>stretch</option>
                <option>start</option>
                <option>center</option>
                <option>end</option>
              </select>
            </div>

            <div className="control">
              <label htmlFor="alignItems">Align Items</label>
              <select id="alignItems" value={alignItems} onChange={e=>setAlignItems(e.target.value)}>
                <option>stretch</option>
                <option>start</option>
                <option>center</option>
                <option>end</option>
              </select>
            </div>

            <div className="control">
              <label htmlFor="autoFlow">Grid Auto Flow</label>
              <select id="autoFlow" value={autoFlow} onChange={e=>setAutoFlow(e.target.value)}>
                <option>row</option>
                <option>column</option>
                <option>dense</option>
                <option>row dense</option>
                <option>column dense</option>
              </select>
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  )
}

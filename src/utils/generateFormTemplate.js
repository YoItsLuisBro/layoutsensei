const ACCENT = '#FFCC00'   // button/focus ring
const SURFACE = '#0f0738'  // input bg
const BORDER  = '#1a0f3d'  // input border
const INK     = '#090040'  // dark ink
const TEXT    = '#F7F5F4'  // text
const MUTED   = '#CFC7C3'  // muted

export function defaultFields(){
  return [
    { type:'text',    label:'Full Name', name:'name',  placeholder:'Jane Doe', required:true,  span:'2' },
    { type:'email',   label:'Email',     name:'email', placeholder:'you@example.com', required:true, span:'1' },
    { type:'tel',     label:'Phone',     name:'phone', placeholder:'', required:false, span:'1' },
    { type:'select',  label:'Topic',     name:'topic', options:'General,Support,Billing,Feedback', required:true, span:'2' },
    { type:'textarea',label:'Message',   name:'message',placeholder:'How can we help?', required:true, span:'2' },
  ]
}

function esc(s=''){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') }

export function generateFormHTML({title, action, method, columns, gap, fields, submitLabel}){
  const gridClass = columns===2 ? 'cols-2' : 'cols-1'
  const gapPx = typeof gap==='number' ? `${gap}px` : gap

  const lines = []
  lines.push(`<form action="${esc(action)}" method="${esc(method || 'POST')}" class="ls-form ${gridClass}" style="--ls-gap:${gapPx};">`)
  lines.push(`  <h3 class="ls-title">${esc(title||'Form')}</h3>`)

  fields.forEach((f, i)=>{
    const id = `f_${i}`
    const spanClass = (f.span==='2' || columns===1) ? 'span-2' : ''
    const req = f.required ? ' required' : ''
    const placeholder = f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : ''
    const min = f.min ? ` min="${f.min}"` : ''
    const max = f.max ? ` max="${f.max}"` : ''
    const pattern = f.pattern ? ` pattern="${esc(f.pattern)}"` : ''

    if (f.type==='textarea'){
      lines.push(`  <div class="field ${spanClass}">`)
      lines.push(`    <label for="${id}">${esc(f.label)}${f.required?' *':''}</label>`)
      lines.push(`    <textarea id="${id}" name="${esc(f.name)}"${placeholder}${req} rows="4"></textarea>`)
      lines.push(`  </div>`)
      return
    }

    if (f.type==='select'){
      const opts = String(f.options||'').split(',').map(s=>s.trim()).filter(Boolean)
      lines.push(`  <div class="field ${spanClass}">`)
      lines.push(`    <label for="${id}">${esc(f.label)}${f.required?' *':''}</label>`)
      lines.push(`    <select id="${id}" name="${esc(f.name)}"${req}>`)
      lines.push(`      <option value="">Select…</option>`)
      opts.forEach(o=> lines.push(`      <option value="${esc(o)}">${esc(o)}</option>`))
      lines.push(`    </select>`)
      lines.push(`  </div>`)
      return
    }

    if (f.type==='radios' || f.type==='checkboxes'){
      const opts = String(f.options||'').split(',').map(s=>s.trim()).filter(Boolean)
      const type = f.type==='radios' ? 'radio' : 'checkbox'
      lines.push(`  <fieldset class="field ${spanClass}">`)
      lines.push(`    <legend>${esc(f.label)}${f.required?' *':''}</legend>`)
      lines.push(`    <div class="choice-row">`)
      opts.forEach((o,idx)=>{
        const rid = `${id}_${idx}`
        const reqFirst = f.required && idx===0 ? ' required' : ''
        lines.push(`      <label class="chip"><input type="${type}" name="${esc(f.name)}" value="${esc(o)}" id="${rid}"${reqFirst}/> <span>${esc(o)}</span></label>`)
      })
      lines.push(`    </div>`)
      lines.push(`  </fieldset>`)
      return
    }

    // inputs
    const t = ['text','email','number','password','tel','url','date'].includes(f.type) ? f.type : 'text'
    lines.push(`  <div class="field ${spanClass}">`)
    lines.push(`    <label for="${id}">${esc(f.label)}${f.required?' *':''}</label>`)
    lines.push(`    <input type="${t}" id="${id}" name="${esc(f.name)}"${placeholder}${req}${min}${max}${pattern} />`)
    lines.push(`  </div>`)
  })

  lines.push(`  <div class="actions">`)
  lines.push(`    <button class="btn primary" type="submit">${esc(submitLabel||'Submit')}</button>`)
  lines.push(`  </div>`)
  lines.push(`</form>`)

  return lines.join('\n')
}

export function generateFormCSS({columns, gap}){
  const cols = columns===2 ? 2 : 1
  const gapPx = typeof gap==='number' ? `${gap}px` : (gap||'12px')

  return `/* LayoutSensei — Form Generator CSS */
.ls-form{
  --ls-gap:${gapPx};
  display:grid;
  grid-template-columns: repeat(${cols}, minmax(0,1fr));
  gap: var(--ls-gap);
  color:${TEXT};
}
.ls-form.cols-1{ grid-template-columns: 1fr; }
.ls-form .span-2{ grid-column: 1 / -1; }
.ls-form .ls-title{
  grid-column: 1 / -1;
  margin: 0 0 .25rem 0;
  font: 700 1.15rem/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: ${ACCENT};
}
.field{ display:grid; gap:.35rem; }
label, legend{ color:${MUTED}; font-size:.95rem; }
input, select, textarea{
  color:${TEXT};
  background:${SURFACE};
  border:1px solid ${BORDER};
  border-radius:10px;
  padding:.6rem .7rem;
  outline: none;
}
textarea{ resize: vertical; min-height: 110px; }
input:focus, select:focus, textarea:focus{
  box-shadow: 0 0 0 3px ${ACCENT}33;
  border-color:${ACCENT};
}
.choice-row{ display:flex; flex-wrap:wrap; gap:.6rem; }
.chip{
  background:${INK};
  border:1px solid ${BORDER};
  color:${TEXT};
  border-radius:999px;
  padding:.35rem .6rem;
}
.chip input{ accent-color:${ACCENT}; }
.actions{ grid-column: 1 / -1; display:flex; justify-content:flex-end; }
.btn.primary{
  background: linear-gradient(90deg, ${ACCENT}, #B13BFF);
  border:1px solid ${BORDER};
  color:${INK};
  padding:.7rem 1rem;
  border-radius:12px;
  cursor:pointer;
}
@media (max-width: 900px){
  .ls-form{ grid-template-columns: 1fr; }
}
`
}

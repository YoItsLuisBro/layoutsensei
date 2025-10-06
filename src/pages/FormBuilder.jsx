import { useMemo, useState } from 'react'
import CodeBlock from '../components/CodeBlock.jsx'
import { generateFormHTML, generateFormCSS, defaultFields } from '../utils/generateFormTemplate.js'

const TYPES = [
  'text','email','number','password','tel','url','date',
  'textarea','select','radios','checkboxes'
]

function FieldEditor({ idx, field, onChange, onDelete, onDup, onMove }) {
  const set = (k,v)=>onChange(idx,{...field,[k]:v})
  return (
    <div className="card" style={{padding:'0.75rem'}}>
      <div style={{display:'grid',gap:'0.6rem',gridTemplateColumns:'1fr 1fr'}}>
        <div className="control">
          <label>Type</label>
          <select value={field.type} onChange={e=>set('type', e.target.value)}>
            {TYPES.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="control">
          <label>Label</label>
          <input value={field.label} onChange={e=>set('label', e.target.value)} />
        </div>

        <div className="control">
          <label>Name</label>
          <input value={field.name} onChange={e=>set('name', e.target.value)} />
        </div>
        <div className="control">
          <label>Placeholder</label>
          <input value={field.placeholder} onChange={e=>set('placeholder', e.target.value)} />
        </div>

        {(field.type==='number') && (
          <>
            <div className="control">
              <label>Min</label>
              <input type="number" value={field.min ?? ''} onChange={e=>set('min', e.target.value)} />
            </div>
            <div className="control">
              <label>Max</label>
              <input type="number" value={field.max ?? ''} onChange={e=>set('max', e.target.value)} />
            </div>
          </>
        )}

        {(field.type==='text') && (
          <div className="control" style={{gridColumn:'1 / -1'}}>
            <label>Pattern (regex)</label>
            <input value={field.pattern||''} onChange={e=>set('pattern', e.target.value)} />
          </div>
        )}

        {(field.type==='select' || field.type==='radios' || field.type==='checkboxes') && (
          <div className="control" style={{gridColumn:'1 / -1'}}>
            <label>Options (comma-separated)</label>
            <input value={field.options||''} onChange={e=>set('options', e.target.value)} placeholder="Red,Green,Blue" />
          </div>
        )}

        <div className="control">
          <label>Required</label>
          <select value={field.required ? 'yes':'no'} onChange={e=>set('required', e.target.value==='yes')}>
            <option value="no">no</option>
            <option value="yes">yes</option>
          </select>
        </div>

        <div className="control">
          <label>Width</label>
          <select value={field.span||'1'} onChange={e=>set('span', e.target.value)}>
            <option value="1">1 column</option>
            <option value="2">2 columns</option>
          </select>
        </div>
      </div>

      <div className="copybar" style={{justifyContent:'space-between',marginTop:'.6rem'}}>
        <div className="badge">Field #{idx+1}</div>
        <div style={{display:'flex',gap:'.4rem'}}>
          <button onClick={()=>onMove(idx,-1)} title="Move up">↑</button>
          <button onClick={()=>onMove(idx, 1)} title="Move down">↓</button>
          <button onClick={()=>onDup(idx)} title="Duplicate">Duplicate</button>
          <button onClick={()=>onDelete(idx)} title="Delete">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function FormBuilder(){
  const [title, setTitle] = useState('Contact Us')
  const [action, setAction] = useState('#')
  const [method, setMethod] = useState('POST')
  const [columns, setColumns] = useState(2)
  const [gap, setGap] = useState(12)
  const [submitLabel, setSubmitLabel] = useState('Send')
  const [fields, setFields] = useState(defaultFields())

  const updateField = (i, f) => setFields(prev => prev.map((x,idx)=> idx===i ? f : x))
  const deleteField = i => setFields(prev => prev.filter((_,idx)=>idx!==i))
  const dupField = i => setFields(prev => {
    const copy = {...prev[i], name: prev[i].name + '_copy'}
    const arr = prev.slice()
    arr.splice(i+1,0,copy)
    return arr
  })
  const moveField = (i, delta) => setFields(prev => {
    const j = i + delta
    if (j<0 || j>=prev.length) return prev
    const arr = prev.slice()
    const [it] = arr.splice(i,1)
    arr.splice(j,0,it)
    return arr
  })

  const html = useMemo(()=>generateFormHTML({title, action, method, columns, gap, fields, submitLabel}), [title, action, method, columns, gap, fields, submitLabel])
  const css  = useMemo(()=>generateFormCSS({columns, gap}), [columns, gap])

  return (
    <section className="container stack">
      <div className="preview-title">
        <strong>Form Generator</strong>
        <span className="items-kbd">{fields.length} fields • {columns} col • gap {gap}px</span>
      </div>

      <div className="grid2">
        {/* PREVIEW + CODE */}
        <div className="card preview-wrap">
          <div className="preview" aria-label="Form live preview" style={{padding:'1.2rem'}}>
            <form className={`ls-form ${columns===2?'cols-2':'cols-1'}`} style={{display:'grid', gap, gridTemplateColumns: columns===2 ? '1fr 1fr' : '1fr'}}>
              <h3 style={{gridColumn:'1 / -1', margin:'0 0 .5rem 0', color:'#FFE177'}}>{title}</h3>

              {fields.map((f,idx)=>{
                const baseStyle = {display:'grid', gap:'.35rem', gridColumn: (f.span==='2'||columns===1) ? '1 / -1' : 'auto'}
                const id = `f_${idx}`
                const req = f.required ? {required:true} : {}
                const common = {id, name:f.name, placeholder:f.placeholder, ...req}
                if (f.type==='textarea') {
                  return (
                    <div key={idx} className="field" style={baseStyle}>
                      <label htmlFor={id}>{f.label}{f.required?' *':''}</label>
                      <textarea {...common} rows={4} style={{resize:'vertical'}}/>
                    </div>
                  )
                }
                if (f.type==='select') {
                  const opts = (f.options||'').split(',').map(s=>s.trim()).filter(Boolean)
                  return (
                    <div key={idx} className="field" style={baseStyle}>
                      <label htmlFor={id}>{f.label}{f.required?' *':''}</label>
                      <select {...common}>
                        <option value="">Select…</option>
                        {opts.map(o=><option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  )
                }
                if (f.type==='radios' || f.type==='checkboxes') {
                  const opts = (f.options||'').split(',').map(s=>s.trim()).filter(Boolean)
                  const name = f.name
                  return (
                    <fieldset key={idx} className="field" style={baseStyle}>
                      <legend>{f.label}{f.required?' *':''}</legend>
                      <div style={{display:'flex',flexWrap:'wrap',gap:'.6rem'}}>
                        {opts.map((o,i)=>
                          <label key={i} className="badge" style={{display:'inline-flex',alignItems:'center',gap:'.4rem',padding:'.35rem .55rem',cursor:'pointer'}}>
                            <input type={f.type==='radios'?'radio':'checkbox'} name={name} value={o} {...(f.required && i===0 ? {required:true}:{})} />
                            <span>{o}</span>
                          </label>
                        )}
                      </div>
                    </fieldset>
                  )
                }
                // inputs
                return (
                  <div key={idx} className="field" style={baseStyle}>
                    <label htmlFor={id}>{f.label}{f.required?' *':''}</label>
                    <input type={f.type} {...common} {...(f.min?{min:f.min}:{})} {...(f.max?{max:f.max}:{})} {...(f.pattern?{pattern:f.pattern}:{})}/>
                  </div>
                )
              })}

              <div style={{gridColumn:'1 / -1', display:'flex', justifyContent:'flex-end'}}>
                <button type="submit" className="btn primary">{submitLabel}</button>
              </div>
            </form>
          </div>

          <div className="grid2">
            <CodeBlock label="HTML" value={html}/>
            <CodeBlock label="CSS" value={css}/>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="card">
          <fieldset className="controls">
            <div className="control">
              <label>Form Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div className="control">
              <label>Action URL</label>
              <input value={action} onChange={e=>setAction(e.target.value)} placeholder="/api/submit" />
            </div>
            <div className="control">
              <label>Method</label>
              <select value={method} onChange={e=>setMethod(e.target.value)}>
                <option>POST</option><option>GET</option>
              </select>
            </div>
            <div className="control">
              <label>Columns</label>
              <select value={String(columns)} onChange={e=>setColumns(+e.target.value)}>
                <option value="1">1</option><option value="2">2</option>
              </select>
            </div>
            <div className="control">
              <label>Gap (px)</label>
              <input type="number" min="0" max="48" value={gap} onChange={e=>setGap(+e.target.value||0)} />
            </div>
            <div className="control">
              <label>Submit Label</label>
              <input value={submitLabel} onChange={e=>setSubmitLabel(e.target.value)} />
            </div>
          </fieldset>

          <div className="stack" style={{marginTop:'1rem'}}>
            {fields.map((f,idx)=>(
              <FieldEditor key={idx}
                idx={idx}
                field={f}
                onChange={updateField}
                onDelete={deleteField}
                onDup={dupField}
                onMove={moveField}
              />
            ))}
          </div>

          <div className="copybar" style={{marginTop:'1rem'}}>
            <button onClick={()=>setFields([...fields, {type:'text', label:'New Field', name:`field${fields.length+1}`, placeholder:'', required:false, options:'', span:'1'}])}>
              + Add Field
            </button>
            <button onClick={()=>setFields(defaultFields())}>Reset to Contact Template</button>
          </div>
        </div>
      </div>
    </section>
  )
}

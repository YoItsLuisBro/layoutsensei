import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="container">
      <div className="hero">
        <div className="stack">
          <span className="badge">Flex, Grid & Forms</span>
          <h2>Design smart, responsive layouts in seconds.</h2>
          <p>
            LayoutSensei now helps you craft <strong>flexbox</strong>, <strong>CSS grid</strong>, and <strong>accessible forms</strong>
            with live previews and ready-to-copy snippets.
          </p>
          <div className="cta">
            <Link className="btn primary" to="/flex">Open Flex Creator</Link>
            <Link className="btn alt" to="/grid">Open Grid Creator</Link>
            <Link className="btn alt" to="/form">Open Form Generator</Link>
          </div>
        </div>
        <div className="card">
          <div className="stack">
            <div className="preview-title">
              <strong>Quick Tips</strong>
              <span className="kbd">RWD</span>
            </div>
            <ul style={{margin:0,paddingLeft:'1.2rem',lineHeight:'1.7'}}>
              <li>Use semantic controls: <code>&lt;fieldset&gt;</code>/<code>&lt;legend&gt;</code> for grouped inputs.</li>
              <li>Keep labels always visible; placeholders are not labels.</li>
              <li>Prefer native validation first; add JS only when needed.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

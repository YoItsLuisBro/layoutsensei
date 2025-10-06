import { NavLink, Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="appbar">
      <div className="container appbar-inner">
        <Link to="/" className="brand" aria-label="LayoutSensei Home">
          <img src="/logo.svg" width="34" height="34" alt="LayoutSensei logo" style={{borderRadius:9}}/>
          <h1>LayoutSensei</h1>
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" className={({isActive})=>isActive?'active':''}>Home</NavLink>
          <NavLink to="/flex" className={({isActive})=>isActive?'active':''}>Flex Creator</NavLink>
          <NavLink to="/grid" className={({isActive})=>isActive?'active':''}>Grid Creator</NavLink>
          <NavLink to="/form" className={({isActive})=>isActive?'active':''}>Form Generator</NavLink>
        </nav>
      </div>
    </header>
  )
}

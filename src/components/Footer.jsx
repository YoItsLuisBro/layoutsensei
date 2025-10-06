export default function Footer() {
    return (
        <footer className="site">
            <div className="container foot-inner">
                <span>© {new Date().getFullYear()} LayoutSensei | Luis Fonseca | Cyber Heaven</span>
                <span>Built with <span aria-hidden>🧡</span> Flex & Grid</span>
            </div>
        </footer>
    )
}
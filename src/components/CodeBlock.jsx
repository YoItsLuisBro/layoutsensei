import { useState } from "react";

export default function CodeBlock({ label="Code", value=""}){
    const [copied, setCopied] = useState(false)
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1300)
        } catch(e){
            // fallback: select + execCommand if needed
            alert('Copy failed. Select and copy manually.')
        }
    }
    return (
        <div className="codeblock" role="region" aria-label={label}>
            <textarea readOnly value={value} />
            <div className="copybar">
                {copied ? <span className="ok">Copied!</span> : <span className="badge">{label}</span>}
                <button onClick={onCopy} aria-label={`Copy ${label}`}>Copy</button>
            </div>
        </div>
    )
}
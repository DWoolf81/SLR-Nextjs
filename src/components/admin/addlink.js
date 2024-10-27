import Link from "next/link"

const Addlink = ({ linkpath, text, className = "" }) => {
    return <Link className={`action-link ${className}`} href={linkpath}>{text}</Link>

}

export default Addlink
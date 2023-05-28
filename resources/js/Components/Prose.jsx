export default function Prose({ value }) {
    return <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: value }} />;
}

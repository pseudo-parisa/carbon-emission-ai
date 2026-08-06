export default function FormInput({ label, type = "number", value, onChange }) {
    return (
        <div>
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} />
        </div>
    );
}
export function ChatMessage(props) {

    const { text, email } = props.message;

    return (<><p>{`[${email}] ${text}`}</p></>)
}
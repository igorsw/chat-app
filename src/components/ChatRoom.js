import React, { useState, useRef } from "react";
import '../App.css';
import { ChatMessage } from "./ChatMessage"
import AppBar from "./AppBar"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import 'firebase/firestore';

import { useCollectionData } from "react-firebase-hooks/firestore"

import { useParams } from "react-router-dom"

const firestore = firebase.firestore()

export function ChatRoom() {
    const auth = firebase.auth();

    let { chatname } = useParams()

    const [formValue, setFormValue] = useState('')

    const msgRef = firestore.collection('chats').doc(chatname).collection('messages')
    const querymsg = msgRef.orderBy("createdAt").limit(25);

    const [msgs] = useCollectionData(querymsg, { idField: 'id' })

    const scroll = useRef()

    const sendMessage = async (e) => {
        e.preventDefault()
        const { email } = auth.currentUser;

        await msgRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            email
        })

        setFormValue("");
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }


    return (
        <>
            <AppBar />
            <section id="messages">
                <div>
                    {msgs && msgs.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                </div>
                <div ref={scroll}></div>
            </section>

            <form id="sendform" onSubmit={sendMessage}>
                <TextField style={{ width: "50vw" }} label="message" variant="outlined" autoFocus required value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <Button type="submit" style={{ padding: "15.5px", width: "5vw" }} variant="contained" color="primary">send</Button>
            </form>
        </>
    )
}
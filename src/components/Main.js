import React, { useState } from "react";
import Chats from "./Chats"
import AppBar from "./AppBar"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField"

import { firestore } from "../firebaseConfig";
const Main = (props) => {
    const [formValue, setFormValue] = useState('')

    const data = { name: formValue, messages: [] };

    const createChat = async (e) => {
        e.preventDefault()
        const res = await firestore.collection('chats').doc(formValue).set(data)
    }

    return (
        <>
            <AppBar {...props} />
            <section className="dashboard">
                <form onSubmit={createChat}>
                    <Typography variant="h4">Create new chat</Typography>
                    <TextField label="name" variant="outlined" autoFocus required value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                    <Button type="submit" style={{ padding: "15.5px" }} variant="contained" color="primary">Create</Button>
                    <p>or join to existing chat</p>
                    <Chats />
                </form>
            </section >
        </>
    )
}

export default Main;
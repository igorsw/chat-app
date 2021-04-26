import React from "react";
import ChatCard from "./ChatCard"
import Grid from "@material-ui/core/Grid"

import { firestore } from "../firebaseConfig";

import { useCollectionData } from "react-firebase-hooks/firestore"

const Chats = () => {
    const chatsRef = firestore.collection('chats')
    const query = chatsRef.limit(25);

    const [chats] = useCollectionData(query, { idField: 'id' })
    return (
        <>
            <Grid container spacing={2}>
                {chats && chats.map(chat => <ChatCard key={chat.id} name={chat.name} />)}
            </Grid>
        </>
    )
}

export default Chats
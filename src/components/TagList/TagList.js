import React, { useState } from 'react';
import api from '../../utils/api';
import { Chip } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

export default function TagList() {
    const history = useHistory();
    const { tag } = useParams();
    const [tags, setTags] = useState([]);
    const [requestSent, setRequestSent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [needInternetConnection, setNeedInternetConnection] = useState();

    if(!requestSent) {
        setRequestSent(true);

        api("/projects/tags")
            .then(({ tags }) => {
                setTags(tags);
            })
            .catch(e => {
                setNeedInternetConnection(true);
            })
            .then(() => {
                setIsLoading(false);
            })
    }

    return (
        <div style={{ margin: '30px 0' }}>
            <Chip label={"Alles"} color={tag === undefined ? "primary" : "default"} style={{ marginRight: 5, marginBottom: 5 }} onClick={() => history.push(`/`)} />

            {isLoading ? 
                <Chip label="Tags laden...." disabled />: 
            (
                needInternetConnection ? <p>Om de tags te zien heb je een actieve internet connectie nodig.</p> : (
                    tags.map((tagData, key) => {
                        return <Chip key={key} label={tagData} style={{ marginRight: 5, marginBottom: 5 }} color={tag === tagData ? "primary" : "default"} onClick={() => history.push(`/tag/${tagData}`)} />
                    })
                )
            )}
        </div>
    );
}
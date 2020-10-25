

import React, { Component, useState, useEffect } from 'react';
import actions from '../api';

function ShowItem(props) {
    const [item, setItem] = useState([])
    useEffect(() => {
        async function getItem() {
            console.log(props)
            let res = await actions.getItem({ listid: props.match.params.listid });
            if (res) {
                console.log(res);
                setItem(res.data?.items);
            } else {
                { alert("Sign your butt in!") }
            }
        }
        getItem();
    }, []);
    console.log(item);



    return (
        <div>yoo</div>
    )
}

export default ShowItem

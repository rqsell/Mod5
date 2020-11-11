import React from 'react';
import { Link } from "react-router-dom";
function ShowList(props) {
    console.log(props)
    const showthislist = () => {


        return props.list?.map((eachname) => {
            return (
                <div>
                    <Link to={`/list/${eachname._id}`} style={{ textDecoration: "none" }}>
                        <h1 className="storename" style={{ textDecoration: "none" }}>{eachname.store}</h1>
                    </Link>

                    {/* <button onclick={deleteList}>x</button> */}
                </div>
            )
        }
        )
    }
    return (
        <div>
            {showthislist()}

        </div>
    )

}


export default ShowList;
import React, {useContext, useEffect, useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from 'react-router-dom'
import socket from "../services/socketIOService";
import {loggingContext, myDataContext} from "../Store";


import a1 from "../static/img/a1.jpg"
import a2 from "../static/img/a2.jpg"
import a3 from "../static/img/a3.jpg"
import a4 from "../static/img/a4.jpg"
import a5 from "../static/img/a5.jpg"
import a6 from "../static/img/a6.jpg"
import a7 from "../static/img/a7.jpg"
import a8 from "../static/img/a8.jpg"
import a9 from "../static/img/a9.jpg"


const Login  = () => {

    const [myData, setMyData] = useContext(myDataContext);
    const [loggedOn, setLoggedOn] = useContext(loggingContext);
    const [state, setState] = useState({ name: "", pictureUrl: a1, isDone: false});


    function handleChange(e){
        setState({
            ...state,
            [e.target.name] : e.target.value
        });

    }

    function submit(){
        if (state.name !== ""){

            let data = {
                username: state.name,
                picture: state.pictureUrl
            };
            socket.emit("newUserCome", data);

            socket.on("your_id", (mySocketId) => {
                setMyData({
                    username: state.name,
                    pictureUrl: state.pictureUrl,
                    mySocketId: mySocketId,
                    myRole: ""
                });
                setLoggedOn(true);
                setState({
                    ...state,
                    isDone: true
                });
            });

        }else{
            alert("Boş qoymayın")
        }
    }

    return (
        <div className="c_login_body">

            {
                state.isDone ? <Redirect to={'/game'} /> : ""
            }

            <div className="form-structor">
                <div className="signup">


                    <div className="form-holder c_form_body">

                        <TextField name="name" id="outlined-basic" label="Adınız" variant="outlined" value={state.name} onChange={handleChange}/>

                        <br/><br/><br/>

                        <FormControl  variant="outlined" className="c_select_input" >
                            <InputLabel id="demo-simple-select-outlined-label">Şəkliniz</InputLabel>

                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                name="pictureUrl"
                                onChange={handleChange}
                                value={state.pictureUrl}
                                label="Şəkliniz"
                            >

                                <MenuItem value={a1}>
                                    <Avatar alt="Remy Sharp" src={a1} />
                                </MenuItem>

                                <MenuItem value={a2}>
                                    <Avatar alt="Remy Sharp" src={a2} />
                                </MenuItem>

                                <MenuItem value={a3}>
                                    <Avatar alt="Remy Sharp" src={a3} />
                                </MenuItem>

                                <MenuItem value={a4}>
                                    <Avatar alt="Remy Sharp" src={a4} />
                                </MenuItem>

                                <MenuItem value={a5}>
                                    <Avatar alt="Remy Sharp" src={a5} />
                                </MenuItem>

                                <MenuItem value={a6}>
                                    <Avatar alt="Remy Sharp" src={a6} />
                                </MenuItem>

                                <MenuItem value={a7}>
                                    <Avatar alt="Remy Sharp" src={a7} />
                                </MenuItem>

                                <MenuItem value={a8}>
                                    <Avatar alt="Remy Sharp" src={a8} />
                                </MenuItem>
                                <MenuItem value={a9}>
                                    <Avatar alt="Remy Sharp" src={a9} />
                                </MenuItem>



                            </Select>
                        </FormControl>

                    </div>
                    <button className="submit-btn" onClick={submit}>Daxil Ol</button>
                </div>
            </div>

        </div>
    );

};

export default Login;

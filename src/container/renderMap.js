import { Fragment, useState } from "react";

export function RenderMap({variables,entities:hi,all:entities}){
    
    console.log(entities);
    let ele = entities.map(({render,name}, i)=>{
        if(render){
            // const renderHook = variables[name];
            if(render.type==="Rec"){
                return <div style={{
                    backgroundColor:render.color,
                    width:30, height:30,
                    position:'absolute',
                    top:render.pos[1],
                    left:render.pos[0]}} key = {i} />    
            }
            else{
                console.error(`unknown render ${render.type}`)
                return null;
            }
        }
        else{
            return null;
        }
    });
    return ele;
}

export function RenderConsole({consoleCallback}){
    const [value, setValue] = useState("");
    return(
    <Fragment>
        <input type={'text'} style={{width:800, height:300}} onChange = {e=>setValue(e.target.value)} value = {value}  />
        <button onClick={()=>{consoleCallback(value);setValue("");}}>send</button>
    </ Fragment>)
}
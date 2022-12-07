import { Fragment } from "react";

export function Render({entities, consoleCallback, value, setValue}){
    if(!entities)return null;
    return (
        entities.map((v, i)=>{
            if(v.render==='console'){
                return (<Fragment  key = {i}>
                        <input type={'text'} style={{width:800, height:300}} onChange = {e=>setValue(e.target.value)} value = {value}  />
                        <button onClick={()=>{consoleCallback(value);setValue("");}}>send</button>
                    </ Fragment>)
            }
            else if(v.render==='map'){
                return <div style={{backgroundColor:'green', width:v.width, height:v.height}} key = {i}>
                    {<Render entities={v.entities} consoleCallback={consoleCallback} />}
                </div>
            }
            else if(v.render==='Rec'){
                return <div style={{backgroundColor:v.color, width:30, height:30, position:'absolute', top:v.pos[0], left:v.pos[1]}} key = {i} />
            }
            else if(v.render==='goal'){
                return <div style={{backgroundColor:v.color, width:40, height:40, borderRadius:'50%', position:'absolute', top:v.pos[0], left:v.pos[1]}} key = {i} />
            }
            else{
                console.error(`unknown render ${v.render}`)
                return null;
            }
        })
    )
}
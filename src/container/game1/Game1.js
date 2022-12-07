import { littlePoorSandbox as sandbox , CreatectxProxy, littlePoorSandbox} from "../sandbox";
import { db } from "./db";
import { useEffect, useState } from "react";
import {Render} from "../render";

export function Game1(props){

    // 可訪問全局作用域的白名單列表
    const access_white_list = ['Math', 'Date', 'setTimeout']

    const [playCor, setPlayCor] = useState([0, 0]);
    const [goalCor, setGoalCor] = useState([Math.round(Math.random()*600), Math.round(Math.random()*800)]);
    const [value, setValue] = useState('');
    const [win, setWin] = useState(false);

    db.entities.find(v=>v.name==='map').entities.find(v=>v.name==='player').pos = playCor;
    db.entities.find(v=>v.name==='map').entities.find(v=>v.name==='goal').pos = goalCor;

    console.log(db);
    const dist = (a,b)=>((a[0]-b[0])*(a[0]-b[0]))+((a[1]-b[1])*(a[1]-b[1])) ;
    useEffect(()=>{
        console.log(dist(playCor, goalCor));

        if(!win&&dist(playCor, goalCor)<400){
            setWin(true);
        }
    },
        [playCor]
    )

    // 執行上下文對象
    const ctx = {
        move: (x, y) => {
            if(x>0&&x<800&&y>0&&y<600)setPlayCor([y, x]);
        },
        test: v=>console.log(v)
    };
    const ctxProxy = CreatectxProxy(ctx, access_white_list);

    const consoleCallback = (value)=>{
        littlePoorSandbox(value, ctxProxy);
    }
    const ele = <Render entities = {db.entities} consoleCallback = {consoleCallback} value={value} setValue = {setValue}/>;

    return (win? <h2>you Win!!</h2>:<div>{ele}</div>);

}


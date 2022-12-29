import { littlePoorSandbox as sandbox , CreatectxProxy, littlePoorSandbox} from "../sandbox";
import { gameData as db } from "./db";
import { useEffect, useState } from "react";
import {Render} from "../render";
import { RenderMap ,RenderConsole} from "../renderMap";
import { useEntities,ContexProvider } from "../hooks/useEntities";



export function MapGame(props){

    // 可訪問全局作用域的白名單列表
    const access_white_list = ['Math', 'Date', 'setTimeout'];
    // assume it's map

    const {hooks,all} = useEntities(db.entities);
    const [winState, setWin] = useState(false);
    const [lossState, setLoss] = useState(false);
    const [mainData,setMainData] = useState({style:db.style});
    if(hooks.variables?.mainData)hooks.variables.mainData = mainData;
    if(hooks.setVariables?.mainData)hooks.setVariables.mainData = setMainData;
    const win = ()=>{
        if(db.gameEnv.win)db.gameEnv.win(hooks);
        setWin(true);
    };
    const loss = ()=>{
        if(db.gameEnv.loss)db.gameEnv.loss(hooks);
        setLoss(true);
    };
    const pass = ()=>{}
    const pack = {...hooks,win,loss,pass};

    console.log(db);
    useEffect(()=>{
        db.gameEnv.gameCheck(pack);
        console.log(pack);
    })

    // 執行上下文對象
    const ctx = {
        test: v=>console.log(v),
        ...(db.console.getUtilities(pack))
    }
    console.log(ctx);
    useEffect(()=>{
        db.gameEnv.gameStart(pack);
        let idList=[];
        db.entities.forEach(({run,runInterval})=>{
            if(run){
                idList.push(setInterval(run(pack),runInterval??300));
            }
        });
        return ()=>{
            idList.forEach(id=>clearInterval(id));
        }
    },[pack]);

    
    const ctxProxy = CreatectxProxy(ctx, access_white_list);

    const consoleCallback = (value)=>{
        littlePoorSandbox(value, ctxProxy);
    }
    console.log(pack);
    
    const ele = <RenderMap variables={pack.variables} entities={db.entities} all={all}/>;
    // winState? <h2>you Win!!</h2>:
    return (<ContexProvider>
        <div style={pack.variables.mainData.style}>
            {ele}
        </div>
        <RenderConsole consoleCallback={consoleCallback} />
        </ContexProvider>);

}


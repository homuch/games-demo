const entities = [
    {
        name:"AI",
        render:false,
        run({setVariables:{Goal:setGoal},variables:{mainData,Player,Goal}}){
            const w = mainData.style.width;
            const h = mainData.style.height;
            const legal=(limit,goal)=>(Math.max(Math.min(goal,limit),0));
            const [px,py] = Player.pos;
            const [gx,gy] = Goal.pos;
            // setGoal.pos([legal((w-20,w+w/(gx-px))),legal((h-20,h+h/(gy-py)))]);
            // setGoal.pos([legal(gx+1),legal(gy-1)]);
        },
        runInterval:1000
    },
    {
        name:"Player",
        isVariable:true,
        render:{
            type:"Rec",
            color:"blue",
            pos:[0,0],
        },
    },
    {
        name:"Goal",
        isVariable:true,
        render:{
            type:"Rec",
            color:"red",
            pos:[0,0],
        },
    }
];

const console = {
    use:true,
    getUtilities:({setVariables:{Player:setPlayer,Goal:setGoal},variables:{mainData}})=>{
        const w = mainData.style.width;
        const h = mainData.style.height;
        const setPlayerCor=(x,y)=>{
            if(x<w&&x>0&&y<h&&y>0)setPlayer.pos([x,y]);
        }
        return {setPlayerCor};
    }
};
const gameEnv = {
    gameStart:({setVariables:{Player:setPlayer,Goal:setGoal},variables:{mainData}})=>{
        const w = mainData.style.width;
        const h = mainData.style.height;
        const dist = (pos1, pos2)=>(Math.sqrt((pos1[0]-pos2[0])*(pos1[0]-pos2[0])+(pos1[1]-pos2[1])*(pos1[1]-pos2[1])));
        let ph = Math.random()*h;
        let pw = Math.random()*w;
        let gh = Math.random()*h;
        let gw = Math.random()*w;
        // while(dist([pw,ph],[gw,gh])<50){
        //     gh = Math.random()*h;
        //     gw = Math.random()*w;
        // }
        pw=Math.round(pw);
        ph=Math.round(ph);
        gw=Math.round(gw);
        gh=Math.round(gh);
        // debugger;
        setPlayer.pos([pw,ph]);
        setGoal.pos([gw,gh])
    },
    gameCheck : ({variables:{Player,Goal}, win, loss, pass})=>{
        const dist = (pos1, pos2)=>(Math.sqrt((pos1[0]-pos2[0])*(pos1[0]-pos2[0])+(pos1[1]-pos2[1])*(pos1[1]-pos2[1])));
        if(dist(Player.pos,Goal.pos)<30){
            // win();
            return;
        }
        pass();
    },
    win : ({setVariables:{Player:setPlayer}})=>{
        setPlayer.color("yellow");
    }
}




const style={
    height:600,
    width:800,
    "backgroundColor":"green"
};



export const gameData ={
    type:"map",
    style,
    console,
    entities,
    gameEnv,
};
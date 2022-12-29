import { createContext, useContext, useState } from "react"
import { gameData } from "../game2/db";
const entities = gameData.entities;

const EntitiesContext = createContext({
    hooks:{},
    all:{},
    setAll:()=>{}
});


const ContexProvider = (props)=>{
    let hooks = {variables:{},setVariables:{}};
    const [all,setAll] = useState(entities);
    entities.forEach((entity,index)=>{
        if(entity.isVariable){
            hooks.variables[entity.name]=all[index].render;
            hooks.setVariables[entity.name]={
                pos:(a)=>{
                    // setTimeout(()=>{
                        setAll((all)=>{
                            console.log(a);
                            all[index].render.pos = a;
                            return all;
                        })
                    // },10);
                    
                },
                type:(type)=>{
                    // setTimeout(()=>{
                        setAll((all)=>{
                            all[index].render.type = type;
                            return all;
                        })
                    // },10);
                    
                },
                color:(color)=>{
                    // setTimeout(()=>{
                        setAll((all)=>{
                            all[index].render.color = color;
                            return all;
                        })
                    // },10);
                    
                }
            }
        }
    })
    
    
    return (<EntitiesContext.Provider value={
        {
            hooks,
            all,
            setAll
        }}
        {...props}
    />)
}

const useEntities = ()=>useContext(EntitiesContext);

export {ContexProvider, useEntities};
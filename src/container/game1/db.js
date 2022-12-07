const entities = [
    {
        name: 'map',
        render: 'map',
        width:800,
        height:600,
        entities:[{
            name: 'player',
            render: 'Rec',
            color: 'blue',
            defaultX:0,
            defaultY:0,
        },
        {
            name: 'goal',
            render: 'goal',
            color: 'red',
        }
    ]
    },
    {
        name: 'console',
        render: 'console'
    }
];




export const db = {
    entities,

}
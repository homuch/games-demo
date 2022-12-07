# game1
test code
```js
const deepX = (x, y)=>{
	if(x>700)return;
	move(x, y);
	setTimeout(()=>deepX(x+25, y), 50);
};
const deepY = (x, y)=>{
	if(y>500)return;
	deepX(x, y);
	setTimeout(()=>setTimeout(()=>deepY(x, y+25), 500),1000);
};

deepY(0, 0);
```
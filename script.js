let data=[];

window.onload=
async function(){

let res=
await fetch(
"./data.json"
);

data=
await res.json();

document
.getElementById(
"chat"
).innerHTML=

localStorage
.getItem(
"chat"
)

||

"";

if(
localStorage.getItem(
"dark"
)==="on"
){

document.body.classList.add(
"dark"
);

}

};

function send(){

let input=
document.getElementById(
"msg"
);

let pesan=
input.value
.toLowerCase()
.trim();

if(
!pesan
)
return;

let hasil=[];

for(
let item
of
data
){

if(

item.keyword.some(

k=>

pesan.includes(k)

)

){

hasil.push(
item.jawaban
);

}

}

let balasan=

hasil.length

?

hasil.join(
"<br><br>"
)

:

"🤖 Tidak paham";

let chat=
document.getElementById(
"chat"
);

chat.innerHTML+=

`
<div class="user">

👤 ${pesan}

</div>

<div class="bot">

<img
class="avatar"
src="./assets/avatar-bot.png"
>

<div>

${balasan}

</div>

</div>
`;

localStorage.setItem(
"chat",
chat.innerHTML
);

input.value="";

chat.scrollTop=
chat.scrollHeight;

}

function quick(
text
){

document
.getElementById(
"msg"
)
.value=
text;

send();

}

function clearChat(){

document
.getElementById(
"chat"
)
.innerHTML=
"";

localStorage.removeItem(
"chat"
);

}

function toggleMode(){

document.body.classList.toggle(
"dark"
);

localStorage.setItem(

"dark",

document.body.classList.contains(
"dark"
)

?

"on"

:

"off"

);

}

document
.getElementById(
"msg"
)
.addEventListener(

"keypress",

function(e){

if(
e.key==="Enter"
){

send();

}

}

);
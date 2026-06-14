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

localStorage
.getItem(
"dark"
)

==="on"

){

document
.body
.classList
.add(
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
.trim()
.toLowerCase();

if(!pesan)return;

let chat=
document.getElementById(
"chat"
);

let jam=
new Date()
.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
);

chat.innerHTML+=
`
<div class="user">

👤 ${pesan}

<div class="time">
${jam}
</div>

</div>

<div
class="bot"
id="typing"
>

<img
class="avatar"
src="./assets/avatar-bot.png"
>

<div class="typing">

<div class="dot"></div>
<div class="dot"></div>
<div class="dot"></div>

</div>

</div>
`;

chat.scrollTop=
chat.scrollHeight;

input.value="";

setTimeout(()=>{

let hasil=[];

for(let item of data){

if(
item.keyword.some(
k=>pesan.includes(k)
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

hasil.join("<br><br>")

:

`
🤖 Maaf saya belum memahami pertanyaan.

<div class="suggest">

<button onclick="quick('harga')">
💰 Harga
</button>

<button onclick="quick('lokasi')">
📍 Lokasi
</button>

<button onclick="quick('kontak')">
📞 Kontak
</button>

</div>
`

document
.getElementById(
"typing"
)
.outerHTML=

`
<div class="bot">

<img
class="avatar"
src="./assets/avatar-bot.png"
>

<div>

${balasan}

<div class="time">

${jam}

</div>

</div>

</div>
`;

localStorage.setItem(
"chat",
chat.innerHTML
);

updateCounter();

chat.scrollTop=
chat.scrollHeight;

input.focus();

},900);

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

localStorage
.removeItem(
"chat"
);

}

function toggleMode(){

document
.body
.classList
.toggle(
"dark"
);

localStorage
.setItem(

"dark",

document
.body
.classList
.contains(
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
e.key===
"Enter"
){

send();

}

}

);
function updateCounter(){

let jumlah=

document
.querySelectorAll(
".user"
)
.length;

document
.getElementById(
"counter"
)
.innerText=
jumlah;

}

updateCounter();
function updateCounter(){

let jumlah=

document
.querySelectorAll(
".user"
)
.length;

document
.getElementById(
"counter"
)
.innerText=
jumlah;

}

updateCounter();
let data=[];

window.onload=
async function(){

try{

let res=
await fetch(
"./data.json"
);

data=
await res.json();

let tambahan=

JSON.parse(

localStorage.getItem(
"faq"
)

||

"[]"

);

data.push(
...tambahan
);

}
catch{

console.log(
"Gagal membaca data"
);

}

document
.getElementById(
"chat"
)
.innerHTML=

localStorage.getItem(
"chat"
)

||

"";

if(

localStorage.getItem(
"dark"
)

===

"on"

){

document.body.classList.add(
"dark"
);

document.querySelector(
".mode"
).innerHTML=
"☀️";

}

updateCounter();

renderStats();

};

function send(){

let input=

document.getElementById(
"msg"
);

let pesanAsli=

input.value
.trim()
.toLowerCase();

let pesan=

pesanAsli

.replace(
/hrga/g,
"harga"
)

.replace(
/lokasinya/g,
"lokasi"
)

.replace(
/whatsapp/g,
"wa"
)

.replace(
/nomor wa/g,
"wa"
)

.replace(
/bayarnya/g,
"bayar"
)

.replace(
/gak/g,
"tidak"
)

.replace(
/ga/g,
"tidak"
)

.replace(
/[^a-z0-9\s]/g,
""
);

if(
!pesan
)
return;

saveStats(
pesanAsli
);

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

👤 ${pesanAsli}

<div class="time">

${jam}

</div>

</div>

<div class="bot" id="typing">

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

for(
let item
of
data
){

let skor=0;

for(
let k
of
item.keyword
){

k=
k.toLowerCase();

if(

pesan.includes(
k
)

){

skor+=2;

}

if(

k.includes(
pesan
)

){

skor+=1;

}

}

if(
skor>0
){

hasil.push({

jawaban:
item.jawaban,

skor

});

}

}

hasil.sort(

(
a,
b
)=>

b.skor-a.skor

);

let balasan=

hasil.length

?

hasil.map(

x=>

x.jawaban

)

.join(
"<br><br>"
)

:

`
🤖 Maaf saya belum memahami pertanyaan.

<div class="suggest">

<button onclick="quick('harga')">
💰 Harga
</button>

<button onclick="quick('kontak')">
📞 Kontak
</button>

<button onclick="quick('promo')">
🔥 Promo
</button>

</div>
`;

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

localStorage.removeItem(
"chat"
);

updateCounter();

}

function toggleMode(){

document.body.classList.toggle(
"dark"
);

let dark=

document.body.classList.contains(
"dark"
);

localStorage.setItem(

"dark",

dark

?

"on"

:

"off"

);

document.querySelector(
".mode"
).innerHTML=

dark

?

"☀️"

:

"🌙";

}

document
.getElementById(
"msg"
)
.addEventListener(

"keypress",

e=>{

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

function saveStats(
pesan
){

let s=

JSON.parse(

localStorage.getItem(
"stats"
)

||

"{}"

);

s[pesan]=

(
s[pesan]
||
0
)

+1;

localStorage.setItem(

"stats",

JSON.stringify(
s
)

);

renderStats();

}

function renderStats(){

let box=

document.getElementById(
"stats"
);

if(
!box
)
return;

let s=

JSON.parse(

localStorage.getItem(
"stats"
)

||

"{}"

);

box.innerHTML=

Object.entries(
s
)

.sort(

(
a,
b
)=>

b[1]-a[1]

)

.slice(
0,
5
)

.map(

x=>

`${x[0]} → ${x[1]}x`

)

.join(
"<br>"
)

||

"Belum ada data";

}

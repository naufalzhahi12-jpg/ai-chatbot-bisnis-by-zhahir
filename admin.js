let faq =
JSON.parse(
localStorage.getItem("faq")
|| "[]"
);

render();

function simpan(){

let keyword =
document
.getElementById("keyword")
.value
.trim();

let jawaban =
document
.getElementById("jawaban")
.value
.trim();

if(
!keyword
||
!jawaban
){

alert(
"Lengkapi dulu"
);

return;

}

faq.push({

keyword:
keyword
.split(",")
.map(
x=>x.trim()
),

jawaban

});

localStorage.setItem(
"faq",
JSON.stringify(faq)
);

document
.getElementById(
"keyword"
).value="";

document
.getElementById(
"jawaban"
).value="";

render();

}

function hapus(index){

faq.splice(
index,
1
);

localStorage.setItem(

"faq",

JSON.stringify(
faq
)

);

render();

}

function resetAll(){

if(
confirm(
"Hapus semua FAQ?"
)
){

faq=[];

localStorage.removeItem(
"faq"
);

render();

}

}

function render(){

let list=
document
.getElementById(
"list"
);

if(
faq.length===0
){

list.innerHTML=

`
<div class="stats">
Belum ada FAQ
</div>
`;

return;

}

list.innerHTML=

faq.map(

(
x,
i
)=>

`

<div class="stats">

<b>
#${i+1}
</b>

<br><br>

🔑
${x.keyword.join(", ")}

<br><br>

💬
${x.jawaban}

<br><br>

<button
class="clear"
onclick="hapus(${i})"
>

🗑 Hapus

</button>

</div>

`

).join("");

}
function exportJSON(){

let hasil=[];

/*
ambil data lama
*/

try{

hasil=
JSON.parse(

localStorage
.getItem(
"faq"
)

||

"[]"

);

}
catch{

hasil=[];

}

if(
hasil.length===0
){

alert(
"Tidak ada FAQ"
);

return;

}

/*
buat file
*/

let file=

new Blob(

[

JSON.stringify(

hasil,

null,

2

)

],

{

type:
"application/json"

}

);

let link=

document
.createElement(
"a"
);

link.href=

URL
.createObjectURL(
file
);

link.download=

"data-export.json";

link.click();

}
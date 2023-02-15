let time=document.querySelector('.time span');
let mis=document.querySelector('.mis span');
let text=document.querySelector('.text');
let box=document.querySelector('textarea');
let startBtn=document.getElementById('start')
let stopBtn=document.getElementById('stop');
let p=document.createElement('p');
let res=document.querySelector('.result');
let acc=document.querySelector('.acc span');
let spe=document.querySelector('.spe span');
let pa='Lorem ipsum dolor sit amet consectetur adipisicing elit. ';
let texarr=[];
let boxarr;
let num=0;
let timer=60;
let cont;
function renderQoutes(){
    texarr=pa.split('').map((e)=>{
        let spa=document.createElement('span');
        spa.setAttribute('class','chars');
        spa.innerHTML=e;
        return spa;
        });
    texarr.map((e)=>{
        p.appendChild(e);
        text.appendChild(p)
    })
}
function showResult(){
    res.style.display='flex';
    let timeTaken=1;
    if(time.innerHTML != 0){
        timeTaken=(60 - time.innerHTML) / 100;
        spe.innerHTML=((boxarr.length)/5/timeTaken).toFixed(2)+' WPM'
    }
        acc.innerHTML=Math.round(((boxarr.length - mis.innerHTML) / boxarr.length) * 100) + ' %'
}
startBtn.onclick=function() {
    res.style.display='none';
    box.removeAttribute('disabled');
    time.innerHTML=`${timer}`;
    box.value='';
    mis.innerHTML='';
    num=0;
    texarr.forEach(e => {
        e.style.color='white';
    });
    mis.style.color='white';
    time.style.color='red';
    stopBtn.style.display='block';
    startBtn.style.display='none';
    function checkCorrect(){
        box.oninput=function(){
            boxarr=box.value.split('');
            if(boxarr[boxarr.length-1]==texarr[texarr.length-2].innerText){
                stop();
             }
            for (let i=0 ; i < texarr.length; i++) {
                if(texarr[i].innerText===boxarr[i]){
                    texarr[i].style.color='blueviolet';
                }
                 else if(texarr[i].innerText!=boxarr[i] && box[i]===box.value){
                    continue;
                 }
                else{
                    texarr[i].style.color='white';
                   }
                
            }
        }
    }
    function clock(){
        cont=setInterval(() => {
            time.innerHTML-=1;
            if(time.innerHTML==0){
                showResult();
                time.innerHTML=`0s`;
                time.style.color='white';
                clearInterval(cont);
                startBtn.style.display='block';
                stopBtn.style.display='none';
                box.disabled='true';
                texarr.forEach(e => {
                    if(e.style.color==='white' && e.innerText!=' '){
                        num++;
                    }
                });
                mis.style.color='red';
                mis.innerHTML=num;
            }
        }, 1000);
    }   
    checkCorrect(); 
    clock();
}
let stop=stopBtn.onclick=function () {
    time.style.color='white';
    clearInterval(cont);
    startBtn.style.display='block';
    stopBtn.style.display='none';
    box.disabled='true';
    texarr.forEach(e => {
        if(e.style.color==='white' && e.innerText!='' && e.innerText!='.'){
            console.log(e);
            num++;
        }
    });
    mis.style.color='red';
    mis.innerHTML=num;
    showResult();
    time.innerHTML=`0s`;
}
window.onload=()=>{
 box.value='';
 startBtn.style.display='block';
 stopBtn.style.display='none';
 box.disabled='true';
 renderQoutes()
}

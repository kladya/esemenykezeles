'use strict';

// setTimeout és setInterval működése

// ha vmit később szeretnék megcsinálni
// SetTimeout 2 paramétert vár, egy fgv-t és egy időeltolódást, hogy
// mennyi idő múlva csinálja meg az adott utasítást millisecundumban
setTimeout( () => {}, );

setTimeout( () => {
    console.log('From timeout');
}, 1000);

// De! ha 0 msec-et írok, akkor is mindig elsőbbsége van azoknak a
// fgv-eknek, amik a setTimeout-on kívül vannak, a setTimeout csak 
// utánuk fog lefutni!
// szinkron fgv-ek: sorban egymás után lefutnak,
// aszinkron fgv: késleltetett (setTimeout)

// a JS kód írásának 1. lépése:
// összegyűjteni, hogy milyen html elemekre lesz szükségem, 
// amikkel dolgozni fogok
// --> kell 4 elem: az óra és a 3 gomb

(function() {
    // megkeresem a szükséges elemeket:
    const clock = document.querySelector('.clock');
    const btnGroup = document.querySelector('.btn-group');
    const playBtn = btnGroup.querySelector('.timer-start');
    const pauseBtn = btnGroup.querySelector('.timer-pause');
    const resetBtn = btnGroup.querySelector('.timer-reset');
// querySelector-t és querySelectorAll-t bármelyik html elemre
// meg lehet hívni, aminek van gyereke, nemcsak a document-re

// gyorsabb lesz a programunk, ha kisebb területen és keve-
// sebbszer kell keresnie egy elemet (ezért adjuk meg a kód
// elején az elemeket 1-1 változóba elmentve)


    // események beállítása:
    let isTiming = false;   //nem számol az óra
    let currentTime = 0;    //az idő amit megjeleníteni szeretnék
    playBtn.addEventListener('click', () => isTiming = true);
    pauseBtn.addEventListener('click', () => isTiming = false);
    resetBtn.addEventListener('click', () => {
        currentTime = 0;
        // clock.textContent = currentTime;   //ha egy kódsor kétszer
        // szerepel, akkor szervezzük ki külön fogv-be:
        showTime();
    });
// ha többsoros a fgv, akkor külön részbe írjuk és ide csak
// a fgv nevét

    // Idő megjelenítése:
    const showTime = () => {
        let minutes = Math.floor(currentTime / 60);
        let seconds = currentTime % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        // clock.textContent = currentTime;
        clock.textContent = `${minutes}:${seconds}`;
    }

    // Idő frissítése:
// a setTimeOut csak egyszer fut le <--> a setInterval pedig adott
// időközönként újra és újra lefut, amíg le nem állítom
// szintén egy fgv-t és egy időt vár
    setInterval(() => {}, 1000);

    setInterval(() => {
        if (!isTiming) {
            return;     //ha számol az óra, akkor ne növelje az időt,
                        // hanem lépjen ki a fgv
        }
        currentTime++;  //növelje a currentTime idejét 1mp-cel
        // clock.textContent = currentTime;  //írja ki az időt
        showTime();
    }, 1000);    

// a setInterval-t nincs értelme egy clearInterval-lal leállítani,
// működik, de bonyolultabbá teszi a kódot
// ehelyett van egy változóm, ami megmondja, hogy megy az óra v. sem
// (isTiming)
// 

})();




// nem is kell a 3 gomb, a btnGroup-ra is tehetem az eseményfigye-
// lőt és így elég csak 1 eseményfigyelő fgv
// --> gyorsabb lesz a kód és kevesebb memóriát emészt fel

// Kattintás kezelő fgv:        //az event néha foglalt szó, ezért
                                // inkább ev-t szoktunk írni
const clockHandlerClick = (ev) => {
    // console.log(ev);
    let btn = null;
    if (ev.target.classList.contains('fa')) {
        btn = ev.target.parentElement;
    } else {
        btn = ev.target;
    }

    const btnClass = btn.className.split('=').pop();
    switch(btnClass) {
        case 'start': isTiming = true;
            break;
        case 'pause': isTiming =false;
            break;
        case 'reset': 
            currentTime = 0;
            showTime();
            break;
    }
}

// események beállítása:
let isTiming = false;   //nem számol az óra
let currentTime = 0;    //az idő amit megjeleníteni szeretnék
btnGroup.addEventListener('click', clockHandlerClick);

// ev.target: az az elem, amire kattintottak
// az a probléma, hogy a gomb(szülőelem) és az ikon is lehet attól
// függően, épp melyikre kattintott a user
// --> megvizsgálom a clockHandlerClick fgv-en belül, hogy az ikonra kattintottak,
// vagy a gombra

// többszáz gomb esetén praktikusabb a szülőelemen lekezelni az
// eseményt, egyébként egyszerűbb a 3 gombra külön beállítani
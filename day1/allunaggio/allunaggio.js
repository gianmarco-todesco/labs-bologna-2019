// ----------------------------------------------------------------------------
// Questo è il programma, scritto in linguaggio JavaScript
// quello che stai leggendo è un commento. Il computer lo ignora ed
// è utile per spiegare meglio alle Claudie cosa succede qui dentro.
// ----------------------------------------------------------------------------

// voglio disegnare nell'area che si chiama 'view' all'interno della pagina web
var canvas = document.getElementById('view');

// ctx è lo strumento che uso per disegnare: tutte le funzioni di disegno
// cominciano per "ctx."
var ctx = canvas.getContext('2d');

// le immagini del razzo e delle fiamme sotto il razzo le prendo dalla pagina
var immagineRazzo = document.getElementById('razzo');
var immagineFiamme = document.getElementById('fiamme');

// queste variabili controllano la posizione (x,y), 
// la velocità (vx,vy) e l'assetto (angolo) del razzo
// ATTENZIONE: la variabile y è rovesciata: i valori crescono verso il basso
// e non verso l'alto (le canvas sono fatte così, sigh)
var x,y,vx,vy,angolo;

// se razzi = 0 i razzi sono spenti
var razzi = 0;

// questo è l'elenco dei tasti premuti
var tastiPremuti = {};

// lo stato del sistema
var esplosione = false;
var tempoEsplosione = 0.0;
var allunato = false;
var messaggio = "";

// questa è la posizione del cratere di atterraggio
var ySuolo = canvas.height - 100; // la coordinata y (verticale)
var x0 = 420, x1 = 560; // in orizzontale il cratere si estende da x0 a x1

//
// questa funzione viene chiamata per iniziare il gioco. 
// assegna a tutte le variabili il loro valore iniziale
//
function inizio() {
    tempoEsplosione = 0;
    allunato = false;
    esplosione = false;
    // il razzo parte nell'angolo in alto e a sinistra
    x = 50;  
    y = 50;
    // all'inizio ha solo una velocità orizzontale, verso destra
    vx = 10;
    vy = 0;
    // e sta dritto (con la coda verso il basso)
    angolo = 0;
    // cancelliamo il messaggio scritto in alto
    messaggio = "";
}

// inizio subito. La funzione verrà poi richiamata quando chi gioca
// preme il tasto 'R'
inizio(); 

//
// questa funzione disegna l'esplosione
//
function disegnaEsplosione() {
    // tempoEsplosione controlla il procedere dell'esplosione
    // va da 0 a 1, a piccoli passi
    tempoEsplosione += 0.02;
    // quando arriva a 1 l'esplosione è finita (e non bisogna più disegnare niente)
    if(tempoEsplosione>1.0) return;
    // all'inizio dell'esplosione si vede ancora il razzo
    if(tempoEsplosione<0.5) disegnaRazzo();
    // l'esplosione è rappresentata da un cerchio il cui raggio prima cresce
    // fino ad un massimo e poi decresce. Possiamo usare la funzione seno(x) per
    // passare da tempoEsplosione (che cresce) al raggio (che cresce e poi cala)
    var raggioEsplosione = 150*Math.sin(tempoEsplosione*Math.PI);
    // disegno il cerchio
    ctx.beginPath();
    ctx.arc(x, y, raggioEsplosione, 0, 2 * Math.PI, false);
    // il colore è una sfumatura che va dal giallo al rosso e poi arriva al
    // trasparente (sui bordi)
    var grd=ctx.createRadialGradient(x,y,0,x,y,raggioEsplosione);
    grd.addColorStop(0,"yellow");
    grd.addColorStop(0.5,"red");
    grd.addColorStop(1,"transparent");
    ctx.fillStyle = grd;
    ctx.fill();
}


//
// Disegna il razzo (nella giusta posizione e con il giusto orientamento)
// (se sono accese disegna anche le fiamme sotto il razzo) 
//
function disegnaRazzo() {
    ctx.translate(x,y); // mi sposto nella posizione giusta
    ctx.rotate(angolo); // ruoto dell'angolo giusto
    if(razzi>0) // se i retrorazzi sono accesi disegno le fiamme
       ctx.drawImage(immagineFiamme, -21.5-5,70-37.5);
    ctx.drawImage(immagineRazzo, -21.5,-37.5); // poi l'immagine del razzo
    ctx.setTransform(1,0,0,1,0,0); // dopo aver disegnato il razzo rimetto a posto
                                   // posizione e rotazione
}

//
// Qui c'è il calcolo della forza che agisce sul razzo, l'accelerazione risultante
// la velocità e alla fine la posizione
// questa è la parte di programma più simile a quello che facevano le protagoniste
// del film
//
function calcolaPosizione() {
    // t è l'intervallo di tempo che passa fra un calcolo e l'altro
    // per essere corretti dovremmo misurarlo (in JavaScript c'è una funzione
    // orologio per misurare il tempo). Però ci facciamo uno sconto e supponiamo che
    // sia sempre 50 millesimi di secondo
    var t = 0.05;
    
    // se il giocatore ha premuto i tasti A o D devo far ruotare il razzo
    // n.b. posso cambiare la velocità con cui ruota cambiando il valore della
    // variabile velocitàDiRotazione
    var velocitaDiRotazione = 0.5;
    if(tastiPremuti['a'] || tastiPremuti['ArrowLeft']) 
        angolo = angolo - t * velocitaDiRotazione;
    else if(tastiPremuti['d'] || tastiPremuti['ArrowRight']) 
        angolo = angolo + t * velocitaDiRotazione;
    
    // se il giocatore ha premuto il tasto S i razzi sono accesi.
    razzi = 0.0;
    if(tastiPremuti['w'] || tastiPremuti['ArrowUp']) 
        razzi = 5.0;
    
    // la spinta dei razzi è in parte verticale e in parte orizzontale
    // dipende dall'angolo. Uso le funzioni seno e coseno per calcolare le due
    // componenti
    var razzi_x = razzi * Math.sin(angolo); // componente orizzontale della spinta
    var razzi_y = razzi * Math.cos(angolo); // componente verticale della spinta
    
    // qui c'è la fisica! N.B. per ottenere l'accelerazione dovrei dividere la forza
    // per la massa, ma mi faccio uno sconto e suppongo che la massa valga 1.
    // la dinamica non cambia.

    // questa è l'accelerazione di gravità.
    // (n.b. stiamo usando delle unità di misura bislacche. questo non è il valore
    // dell'accelerazione di gravità sulla luna, ma è un valore scelto a tentativi
    // che fa funzionare bene il gioco. Puoi provare a cambiarlo)    
    var accelerazioneDiGravita = 2.0;
    
    vx = vx + t * razzi_x; // la velocità orizzontale viene modificata 
                           // dalla spinta orizzontale dei raggi
    vy = vy + t * (-razzi_y + accelerazioneDiGravita); 
                           // la velocità verticale viene modificata dalla 
                           // spinta verticale dei raggi e dall'accelerazione di
                           // gravità.
                           
    // una volta che ho le velocità aggiornate passo a calcolare la posizione
    x = x + t * vx;
    y = y + t * vy;

    // controlliamo se siamo allunati
    if(y > ySuolo) {
        // abbiamo toccato il suolo lunare!!
        y = ySuolo;
        // razzi spenti e assetto verticale!!
        razzi = 0.0;
        angolo = 0.0;
        // ci siamo schiantati? siamo allunati fuori dal cratere?? se è così allora
        // esplosione!
        if(vy>10) { // se vuoi rendere il gioco più difficile diminuisci questo numero
            messaggio = "Discesa troppo veloce : " + Math.floor(vy) + " m/s";
            esplosione = true;
        }
        else if(x<x0 || x>x1) 
        {
            messaggio = "Posizione sbagliata";
            esplosione = true;
            
        }
        else
        {
            // altrimenti siamo allunati!!
            messaggio = "Complimenti! Allunaggio perfetto!";
            allunato = true;
        }
        
    }
}

//
// nuovoFotogramma() viene chiamato ad ogni fotogramma, molte volte al secondo
// deve fare tutti i calcoli e ridisegnare l'immagine. La rapida sequenza delle 
// immagini dà l'impressione del movimento.
//
function nuovoFotogramma() {  
    // all'inizio cancello tutto  
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if(allunato)
        // siamo allunati: mi limito a disegnare il razzo
        disegnaRazzo();
    else if(esplosione)
        // uh oh: stiamo esplodendo o siamo esplosi :-(        
        disegnaEsplosione(); 
    else 
    {
        // stiamo ancora volando: calcoliamo la posizione
        calcolaPosizione();
        // e disegnamo il razzo
        disegnaRazzo();
               
    }  
    // scrivo qualcosa in alto    
    ctx.font="14px Verdana";
    ctx.fillStyle ='white';
    if(messaggio != "")
        ctx.fillText(messaggio, 300,50);
    else
        ctx.fillText("Vy = "+Math.floor(vy)+" m/s",300,50);

    
    // vogliamo che nuovoFotogramma() sia chiamato di nuovo, il prima possibile
    window.requestAnimationFrame(nuovoFotogramma);    
}

// comincio a chiamare nuovoFotogramma()
window.requestAnimationFrame(nuovoFotogramma);

// voglio sapere quali tasti sono premuti e quali no.
window.onkeydown=function(e) { if(e.key=='r') inizio(); tastiPremuti[e.key] = true; }
window.onkeyup=function(e) { tastiPremuti[e.key] = false; }


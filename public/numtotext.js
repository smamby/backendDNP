//###########################################################
//#######                                             #######
//#######         NUMERO A TEXTO ALFABETICO           #######
//#######                                             #######
//###########################################################

// ||||||||||||||      INSTRUCCIONES       ||||||||||||||||||

//init(numero)
// ej.: init(6345) ==> 'seis mil trescientos cuarenta y cinco'


var input;
var numString = '';
var numLength = 0;
var arr = []
var adpArr = []
var cenYdes = []
var secCenYdes = [];
var terCenYdes = [];

//fracNum()
//var primTercio = [arr[arr.length-3],arr[arr.length-2],arr[arr.length-1]];

const unidad = {  //if length es 1
    1: "uno",
    2: "dos",
    3: "tres",
    4: "cuatro",
    5: "cinco",
    6: "seis",
    7: "siete",
    8: "ocho",
    9: "nueve",
};
const decena = {  //if length es 2 && u = 0
    1: "diez",
    2: "veinte",
    3: "treinta",
    4: "cuarenta",
    5: "cincuenta",
    6: "sesenta",
    7: "setenta",
    8: "ochenta",
    9: "noventa",
}
const primeraDecena = {  //if length es 2 && < 20
    0: "diez",
    1: "once",
    2: "doce",
    3: "trece",
    4: "catorce",
    5: "quince",
    6: "dieciseis",
    7: "diecisiete",
    8: "dieciocho",
    9: "diecinueve",
}
const decenas = {  //if length es 2 && > 20
    2: "venti",
    3: "treinta",
    4: "cuarenta",
    5: "cincuenta",
    6: "sesenta",
    7: "setenta",
    8: "ochenta",
    9: "noventa",
}
const centena = "cien";
const centenas = { //if length es 3 > 100
    1: "ciento",
    2: "doscientos",
    3: "trescientos",
    4: "cuatrocientos",
    5: "quinientos",
    6: "seiscientos",
    7: "setecientos",
    8: "ochocientos",
    9: "novecientos"
}

function lenArr(numLength){    
    var estArr = {
    1: [ arr[arr.length-1] ],
    2: [ arr[arr.length-2], arr[arr.length-1] ],
    3: [ [ arr[arr.length-3] ], 
         [ arr[arr.length-2], arr[arr.length-1] ] ],
    4: [ [ arr[arr.length-4] ], 
         [ arr[arr.length-3], arr[arr.length-2], arr[arr.length-1] ] ],
    5: [ [ arr[arr.length-5], arr[arr.length-4] ],
         [ arr[arr.length-3], arr[arr.length-2], arr[arr.length-1] ] ],

    6: [ [ [arr[arr.length-6]], [arr[arr.length-5], arr[arr.length-4]] ],
         [ [arr[arr.length-3]], [arr[arr.length-2], arr[arr.length-1]] ] ],

    7: [ [ arr[arr.length-7] ],
         [ [arr[arr.length-6]], [arr[arr.length-5], arr[arr.length-4]] ],
         [ [arr[arr.length-3]], [arr[arr.length-2], arr[arr.length-1]] ] ],
    8: [ [ arr[arr.length-8], arr[arr.length-7] ],
         [ [arr[arr.length-6]], [arr[arr.length-5], arr[arr.length-4]] ],
         [ [arr[arr.length-3]], [arr[arr.length-2], arr[arr.length-1]] ] ],
    9: [ [ [arr[arr.length-9]], [arr[arr.length-8], arr[arr.length-7]] ],
         [ [arr[arr.length-6]], [arr[arr.length-5], arr[arr.length-4]] ],
         [ [arr[arr.length-3]], [arr[arr.length-2], arr[arr.length-1]] ] ],
    }
    return estArr[numLength]
}

function uni(a){
    if(numLength==1){
        return unidad[a[0]]
    }
}
function dec(a){
    //console.log('aDec',a)
    if(input==20){
        return "veinte"
    }
    if(a.length==2 && a[0]=='0' && a[1]=='0'){
        return ''
    }
    if(a.length==2 && a[0]=='0' && a[1]!='0'){
        return unidad[a[1]]
    }
    if(a.length==2 && a[0]==1){
        return primeraDecena[a[1]]
    }
    if(a.length==2 && a[1]==0 && input!=20){
        return decena[a[0]]
    }
    if(a.length==2 && a[0]==2 && input!=20){
        return (decenas[a[0]]+unidad[a[1]])
    }
    if(a.length==2 && a[1]!=0){
        return (decenas[a[0]]+' y '+unidad[a[1]])
    }
}

function cen(x){
    //console.log('xCen',x) 
    if(x[0][0]=='1' && x[1][0]=='0' && x[1][1]=='0'){
        return "cien";
    }
    if(x[0][0]=='1' && (x[1][0]!='0' && x[1][1]!='0')){
        return `ciento `
    }
    if(x[0][0]=='1' && (x[1][0]!='0' && x[1][1]=='0')){
        return `ciento `
    }
    if(x[0][0]=='1' && (x[1][0]=='0' && x[1][1]!='0')){
        return `ciento `
    }
    if(x[0][0]=='1' && (x[1][0]=='1' && x[1][1]=='0')){
        return `ciento `
    }
    if(x[0][0]>parseInt('1') && x[1][0]=='0' && x[1][1]=='0'){
        return (centenas[x[0][0]]+'')
    }
    if(x[0][0]>parseInt('1') && (x[1][0]!='0' || x[1][1]!='0')){
        return (centenas[x[0][0]]+' ')
    }
    if(x[0][0]=='0' && x[1][0]=='0' && x[1][1]=='0'){
        return ''
    }
    if(x[0][0]=='0' && x[1][0]=='0' && x[1][1]!='0'){
        return ''
    }
    if(x[0][0]=='0' && x[1][0]!='0' && x[1][1]!='0'){
        return ''
    }
    if(x[0][0]=='0' && x[1][0]!='0' && x[1][1]=='0'){
        return ''
    }
}
function mil(){
    if(arr[arr.length-4]==1){
        return 'un mil';
    }
    if(arr[arr.length-4]>1){
        return unidad[arr[0]]+' mil';
    }
    //return false
}
function millo(x){
    var lM = arr[arr.length-7];
    if(lM==1){
        return 'un millon '
    } else {
        return unidad[x[0][0]]+' millones '
    }
}

//BUILDER
function fracNum(){
    for(var i of numString){
        arr.push(i)
    }
    adpArr = lenArr(numLength)
    cenYdes = lenArr(3)
    secCenYdes = [ [arr[arr.length-6]], [arr[arr.length-5], arr[arr.length-4]] ];
    terCenYdes = [ [arr[arr.length-9]], [arr[arr.length-8], arr[arr.length-7]] ];    
}

function select(numLength){
    if(numLength==1){
        return uni(arr)
    }
    if(numLength==2){
        return dec(arr)
    }
    if(numLength==3){
        return `${cen(cenYdes)}${dec(cenYdes[1])}`
    }
    if(numLength==4){
        return `${mil()} ${cen(cenYdes)}${dec(cenYdes[1])}`
    }
    if(numLength==5){
        if(arr[arr.length-4]==1){
            var resu = (dec(adpArr[0])).slice(0,-1)
            return `${resu} mil ${cen(cenYdes)}${dec(cenYdes[1])}`
        } 
        if (arr[arr.length-4]!=1){
            return `${dec(adpArr[0])} mil ${cen(cenYdes)}${dec(cenYdes[1])}`
        }
    }
    if(numLength==6){
        if(arr[arr.length-4]==1){
            var resu = (dec(secCenYdes[1])).slice(0,-1)
            return `${cen(secCenYdes)}${resu} mil ${cen(cenYdes)}${dec(cenYdes[1])}`
        } 
        if (arr[arr.length-4]!=1){
            return `${cen(secCenYdes)}${dec(secCenYdes[1])} mil ${cen(cenYdes)}${dec(cenYdes[1])}`
        }
        //return `${cen(secCenYdes)}${dec(secCenYdes[1])} mil ${cen(cenYdes)}${dec(cenYdes[1])}`
    }
    if(numLength==7){
        if(arr[1]==0 && arr[2]==0 && arr[3]==0){
            return `${millo(adpArr)}${cen(cenYdes)}${dec(cenYdes[1])}`
        }
        if(arr[1]!=0 && arr[2]==0 && arr[3]==0){
            return `${millo(adpArr)}${cen(adpArr[1])}${dec(adpArr[1][1])}mil ${cen(cenYdes)}${dec(cenYdes[1])}`
        }
        if(arr[arr.length-4]==1){
            var resu = (dec(secCenYdes[1])).slice(0,-1)
            return `${millo(adpArr)}${cen(adpArr[1])}${resu} mil ${cen(cenYdes)}${dec(cenYdes[1])}`
        }
        
        return `${millo(adpArr)}${cen(adpArr[1])}${dec(adpArr[1][1])} mil ${cen(cenYdes)}${dec(cenYdes[1])}`
    }
    if(numLength==8){
        console.log(input)
        var decM = Math.floor(input/1000000)
        var primSeis = input-(decM*1000000)
        console.log(primSeis)
        console.log(decM)
        var uno = init(decM)
        var dos = init(primSeis)
        if(primSeis==0){
            return `${uno} millones`
        }
        return `${uno} millones ${dos}`
    }
    if(numLength==9){
        var cenM = Math.floor(input/1000000)
        var primSeis = input-(cenM*1000000)
        console.log(primSeis)
        console.log(cenM)
        var cenMst = cenM.toString()
        var uno = init(cenM)
        console.log(typeof cenMst, cenMst)
        console.log(cenMst[cenMst.length-2]!=1)
        console.log(cenMst[cenMst.length-1]==1)
        var resu = uno.slice(0,-1)
        console.log(resu)
        var dos = init(primSeis)
        if (cenMst[cenMst.length-2]!=1 && cenMst[cenMst.length-1]==1){
            uno = resu
        }
        if(primSeis==0){
            return `${uno} millones`
        }
        //if(uno[uno.length-1]!=1 && primSeis!=0){
            return `${uno} millones ${dos}`
        //}
    }
}

function init(into){
    input = into
    numString = input.toString();
    numLength = numString.length;
    arr = [];
    fracNum();
    //console.log('arr',arr);
    adpArr = lenArr(numLength)
    //console.log('adpArr',adpArr)
    cenYdes = lenArr(3)
    //console.log('cenYdes',cenYdes)
    secCenYdes = [ [arr[arr.length-6]], [arr[arr.length-5], arr[arr.length-4]] ];
    //console.log('secCenYdes',secCenYdes)
    terCenYdes = [ [arr[arr.length-9]], [arr[arr.length-8], arr[arr.length-7]] ];
    //console.log('terCenYdes',terCenYdes)
    var result = select(numLength)
    console.log('==>>  ',result)
    return result
}

//TEST
const lista = [1,11,111,101,117,120,121,130,135,999,1000,1001,1100,1101,1011,1111,1020,1099,1999,9999,10000,10010,100100,109101,600198,300000,310000,200134,21000,121000,130000,131000,41000,431000,551145,245000,431431,34000,345001,661311,224121,100000000,121000120,350234345,23456344,131100100,111111111,1789786]
const lista2 = [600198,300000,310000,200134,21000,121000,130000,131000,41000,431000,551145,245000,431431,34000,345001,661311,224121]
const lista3 = [100000000,121000120,350234345,23456344,131100100,111111111,1789786]
function test(list){
    var resu = []
    for(var a of list){
        var res = init(a)
        let ar = []
        ar.push(a)
        ar.push(res)
        resu.push(ar)
    }
    console.log(resu)
}
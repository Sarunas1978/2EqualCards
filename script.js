let object0=[{    picture : `&#9743`,    color1:  "magenta",      identicalTo: 0},
            {     picture : `&#9743`,    color1:  "yellow",       identicalTo: 1},
            {     picture : `&#10050`,   color1:  "blue",         identicalTo: 2},
            {     picture : `&#10050`,   color1:  "orange",       identicalTo: 3}]
let object1=[{    picture : `&#9860;`,   color1:  "magenta",      identicalTo: 4},
            {     picture : `&#9860;`,   color1:  "yellowgreen",  identicalTo: 5},
            {     picture : `&#9775;`,   color1:  "blue",         identicalTo: 6},
            {     picture : `&#9775;`,   color1:  "grey",         identicalTo: 7}]
let object2=[{    picture : `&#9819`,    color1:  "coral",        identicalTo: 8},
            {     picture : `&#9819`,    color1:  "green",        identicalTo: 9},
            {     picture : `&#10016;`,  color1:  "brown",        identicalTo: 10},
            {     picture : `&#10016;`,  color1:  "grey",         identicalTo:11}]
let object3=[{    picture : `&#9785;`,   color1:  "green",        identicalTo: 12},
            {     picture : `&#9785;`,   color1:  "red",          identicalTo: 13},
            {     picture : `&#9785;`,   color1:  "brown",        identicalTo: 14},
            {     picture : `&#9829;`,   color1:  "darkgrey",     identicalTo: 15},
            {     picture: `&#9829;`,    color1: "orange",        identicalTo: 16},
            {     picture: `&#9829;`,    color1: "red",           identicalTo: 17}]

function shuffle(array) {
    let x = array.length;
    let temp, index;

    while (x > 0) {
        index = Math.floor(Math.random() * x--);
        temp = array[x];
        array[x] = array[index];
        array[index] = temp;
    }
    return array;
}

let itemsArray=shuffle([...object0,...object1, ...object2, ...object3, ...object0,...object1, ...object2, ...object3])

let firstCardClicked=true
let firstCardId=-1;
let firstValue;
let secondCardClicked=true
let secondCardId=-1;
let secondValue;
let isTheSame =[firstCardClicked, secondCardClicked]
let cardsClicked = 0
let startTime;

init(1)
const windows=document.getElementsByClassName("w-100")

function init(documentBodyChildrenIndex=0) {
    const startTime=Date.now()
    const mainDiv=document.body.children[documentBodyChildrenIndex]
    let div;
    for (let i = 0; i < 36; i++) {
        div = document.createElement("div")
        div.classList.add("w-100")
        div.setAttribute("id",String(i))
        addListener(div)
        mainDiv.appendChild(div)
        createSomething(div, i)
    }
}
function createSomething(div, i){
        let innerDiv=document.createElement("div")
        div.innerHTML=""
        innerDiv.classList.add("w-100-flip-inner")
        div.appendChild(innerDiv)

        let frontFlip=document.createElement("div")
        frontFlip.classList.add("flip-card-front", "displayFlex", "displayJustifyContentC", "alignItemsC" )
        frontFlip.innerText="flip me!"
        innerDiv.appendChild(frontFlip)

        let backFlip=document.createElement("div")
        backFlip.classList.add("flip-card-back",  "displayFlex", "displayJustifyContentC", "alignItemsC")
        backFlip.style.backgroundColor=itemsArray[i].color1
        backFlip.style.fontSize="70px"
        backFlip.setAttribute("id",String(i)+"back")
        backFlip.innerHTML= itemsArray[i].picture
        innerDiv.appendChild(backFlip)
}
function showMouseEnter(event) {
    event.target.children[0].style.transform = "rotateY(180deg)"
    event.target.children[0].style.transition = "transform 0.5s"
    event.target.children[0].style.transformStyle = "preserve-3d"
}
function showClick(event) {
    let value = event.path[2].id

    event.path[2].removeEventListener("mouseenter", showMouseEnter)
    event.path[2].removeEventListener("mouseleave", showMouseLeave)
    event.path[2].removeEventListener("click", showClick)
    event.target.style.backfaceVisibility="visible"

    if(firstCardClicked){
        firstCardId=value
        firstCardClicked=!firstCardClicked

    } else {
        firstValue=event.target
        secondCardId=value;
        firstCardClicked=!firstCardClicked
        if(!checkForEquality()){

            let a= document.getElementById(`${firstCardId}`)
            //event.target.style.backfaceVisibility="hidden"
            //firstValue.style.backfaceVisibility="hidden"
            createSomething(event.path[2],secondCardId)
            addListener(event.path[2])
            createSomething(a,firstCardId)
            addListener(a)
            addListener(a)
        }
        firstCardId=-1
        secondCardId=-1
    }
    // value!=="" && +value ? cardsClicked++ : null
    // if (cardsClicked===35){
    //     startTime=(Date.now()-startTime)/1000/60
    //     alert("game over!")
    // }


}
function showMouseLeave(){
    //console.log(this.id)
    this.innerHTML=""
    createSomething(this, this.id)
}
function checkForEquality(){
    return itemsArray[firstCardId].identicalTo===itemsArray[secondCardId].identicalTo? true : false
}
function addListener(id){
    id.addEventListener("mouseenter", showMouseEnter)
    id.addEventListener("mouseleave", showMouseLeave)
    id.addEventListener("click", showClick)
}
let slidercontainer = document.getElementById('slidercontainer');
let slider = document.getElementById('slider');
let cards = slider.getElementsByTagName('li');
let prevBtn = document.getElementById('prev'); 
let nextBtn = document.getElementById('next'); 

let slidercontainerWidth = slidercontainer.clientWidth;
let elementsToshow = 5;

let cardWidth = slidercontainerWidth / elementsToshow;

slider.style.width = cards.length * cardWidth + 'px';


for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.style.width = cardWidth + 'px';
}

let currentPosition = 1;

function updateButtons() {
    prevBtn.style.display = currentPosition === 0 ? 'none' : 'block';
    nextBtn.style.display = currentPosition <= -(cards.length - elementsToshow) * cardWidth ? 'none' : 'block';
}

function prev() {
    if (currentPosition < 0) {
        currentPosition += cardWidth;
        slider.style.marginLeft = currentPosition + 'px';
    }
    updateButtons();
}

function next() {
    if (currentPosition > -(cards.length - elementsToshow) * cardWidth) {
        currentPosition -= cardWidth;
        slider.style.marginLeft = currentPosition + 'px';
    }
    updateButtons();
}


updateButtons();

let allquestion = document.querySelectorAll(".faquestion");
allquestion.forEach((v, index) => {
    v.addEventListener('click', ()=> {
        v.nextElementSibling.classList.toggle("h-[auto] ");
        v.nextElementSibling.classList.add("scale-y-100")
        v.nextElementSibling.classList.toggle(" p-[20px]")
    })
})

document.querySelectorAll(".faquestion").forEach(item => {
    item.addEventListener("click", function () {
        let answer = this.nextElementSibling;
        answer.classList.toggle("hidden");
    });
});

function alert() {
    var text = document.getElementById("btn").value
    document.getElementById("btndis").innerHTML="please signin to Netflix"
    alert(text)
}
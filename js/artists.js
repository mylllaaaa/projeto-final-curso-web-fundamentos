class Carousel{
    constructor(selector){
        this.carousel = document.querySelector(selector)
        this.wrapper = this.carousel.querySelector("[data-carousel-wrapper]")
        this.prev = this.carousel.querySelector("[data-carousel-prev]")
        this.next = this.carousel.querySelector("[data-carousel-next]")
        this.indicatorsContainer = document.getElementById(this.carousel.getAttribute("data-carousel-indicators"))
        this.items = this.wrapper.querySelectorAll("[data-carousel-items]")
        this.currentIndex = 0
    }

    init() {
        console.log(this)
        this.createIndicators()
        this.addListeners()
        this.updateCarousel()
    }

    createIndicators(){
        this.items.forEach((item, index) => {
            const indicator = document.createElement("div")
            indicator.classList.add("indicator")

            // indicator.dataset.carouselIndex = index
            indicator.setAttribute("data-carousel-index", index)
            // indicator.textContent = index
            this.indicatorsContainer.appendChild(indicator)
        })
    }

    addListeners(){
        this.prev.addEventListener("click", () => {
            this.currentIndex  = (this.currentIndex - 1 + this.items.length) % this.items.length
            this.updateCarousel()
        })
        
        this.next.addEventListener("click", () => {
            this.currentIndex = (this.currentIndex + 1) % this.items.length
            this.updateCarousel()
        }) 

        this.indicatorsContainer.querySelectorAll(".indicator").forEach(indicator => {
            indicator.addEventListener("click", e => {
                this.goToSlide(parseInt(e.target.getAttribute("data-carousel-index")))
            })
        })
    }

    goToSlide(index){
        this.currentIndex = index
        this.updateCarousel()
    }

    updateCarousel(){
        this.wrapper.style.setProperty("--currentIndex", this.currentIndex)
        this.indicatorsContainer.querySelector(".active")?.classList.remove("active")
        this.indicatorsContainer.querySelector(`[data-carousel-index="${this.currentIndex}"]`)?.classList.add("active");
    }
}

/*
currentIndex = 0
items.length = 3 

prev - desejado é currentIndex = 2
prev - desejado é currentIndex = 1
prev - desejado é currentIndex = 0
prev - desejado é currentIndex = 2
*/

/*
currentIndex = 0
items.length = 3 

next - desejado é currentIndex = 1
next - desejado é currentIndex = 2
next - desejado é currentIndex = 0
*/

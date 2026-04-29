document.addEventListener("DOMContentLoaded", function() {

// make the checkbox div focusable
const captchaCheckbox = document.getElementById("captcha-checkbox")
const checkboxSpinner = document.getElementById("captcha-checkbox-spinner")
captchaCheckbox.addEventListener("mousedown",()=> {
    captchaCheckbox.classList.add("focused")
    captchaCheckbox.classList.remove("blurred")
})

captchaCheckbox.addEventListener("mouseup",()=> {
    captchaCheckbox.classList.add("blurred")
    captchaCheckbox.classList.remove("focused")
})

captchaCheckbox.addEventListener("click",()=> {
    checkboxSpinner.style.display = "block"
    captchaCheckbox.style.display = "none"
    captchaCheckbox.style.visibility = "false"
    setTimeout(()=>{
        captchaCheckbox.style.display = "block"
        checkboxSpinner.style.display = "none"

    // show the solve box
    const solveBox = document.getElementById("solve-box")
    if (solveBox.classList.contains("visible")) {
        solveBox.classList.remove("visible")
    } else {
        solveBox.classList.add("visible")
    }
    },Math.floor(Math.random()*1000)+200)
})

// show error if submit button is click without checking the checkbox
document.getElementById("submit").addEventListener("click",()=>{
    document.getElementById("captcha-main-div").classList.add("error")
    document.getElementById("captcha-error-msg").style.display = "block"
})

// Track current level (1 or 2)
let currentLevel = 1

// Store selected image indices
let selectedImages = new Set()

// Store correct answers for current level
let correctAnswersForLevel = [2, 4, 7, 8]

// Function to load images and create event listeners
function loadImageSet(imageFolder, correctAnswers, titleText, subtitleText) {
    const solveImageContainer = document.getElementById("solve-image-main-container")
    correctAnswersForLevel = correctAnswers  // Store the answers for this level
    solveImageContainer.innerHTML = "" // Clear previous images
    selectedImages.clear()
    
    // Update title
    document.getElementById("solve-title-text").textContent = titleText
    document.getElementById("solve-title-subtext").textContent = subtitleText
    
    // Clear error message
    document.getElementById("solve-image-error-msg").style.display = "none"
    
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            const imageIndex = (i*3)+j+1
            const imageContainer = document.createElement("div")
            imageContainer.classList.add("solve-image-container")

            const image = document.createElement("img")
            image.setAttribute("src",`${imageFolder}/img${imageIndex}.jpg`) 
            image.classList.add("solve-image")
            
            image.addEventListener("click",()=>{
                imageContainer.classList.toggle("clicked")
                image.classList.toggle("clicked")
                
                // Track selected images
                if (imageContainer.classList.contains("clicked")) {
                    selectedImages.add(imageIndex)
                } else {
                    selectedImages.delete(imageIndex)
                }
            })
            
            imageContainer.appendChild(image)
            solveImageContainer.appendChild(imageContainer)
        }
    }
}

// Load initial image set
loadImageSet("./traffic", [2, 4, 7, 8], "traffic lights", "Select all images with")

// Handle verify button click
document.getElementById("verify").addEventListener("click",()=> {
    if (selectedImages.size === correctAnswersForLevel.length && 
        correctAnswersForLevel.every(img => selectedImages.has(img))) {
        
        // Correct! Load next level
        currentLevel++
        
        if (currentLevel === 2) {
            loadImageSet(
                "./bikes", 
                [2, 3, 6, 7],
                "bicycles",
                "Select all images with"
            )
        } else if (currentLevel === 3) {
            loadImageSet(
                "./mitosis",
                [3, 5],
                "the Metaphase of Mitosis",
                "Select all cells in"
            )
        } else if (currentLevel === 4) {
            loadImageSet(
                "./months",
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                "28 days",
                "Select all the months with"
            )
        } else if (currentLevel === 5) {
            loadImageSet(
                "./river",
                [5, 9],
                "always runs but never walks, has a bed but never sleeps, has a mouth but never speaks",
                "Select all images with something that"
            )
        } else if (currentLevel === 6) {
            loadImageSet(
                "./images3",
                [2, 3, 6],
                "are on the clock",
                "Select all images that"
            )
        } else if (currentLevel === 7) {
            loadImageSet(
                "./images2",
                [2, 5, 6, 9],
                "are in the sink",
                "Select all images that"
            )
        } else if (currentLevel === 8) {
            loadImageSet(
                "./images4",
                [1, 4, 7, 8],
                "are on page # of the books in this room",
                "Select all images that"
            )
        } else if (currentLevel === 9) {
            loadImageSet(
                "./disasters",
                [3, 5, 6, 7],
                "spelled by the letters connected with red string",
                "Select all images with what is"
            )
        }
    } else {
        document.getElementById("solve-image-error-msg").style.display = "block"
    }
})

// toggle information
document.getElementById("information").addEventListener("click",() =>{
    const information = document.getElementById("information-text")
    if (information.style.display == "block") {
        information.style.display = "none"
    }
    else {
        information.style.display = "block"
    }
})

})

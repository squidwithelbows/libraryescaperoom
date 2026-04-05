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
        if (solveBox.style.display == "block") {
            solveBox.style.display = "none"
        }
        else {
            solveBox.style.display = "block"
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

// Function to load images and create event listeners
function loadImageSet(imageFolder, correctAnswers, titleText, subtitleText) {
    const solveImageContainer = document.getElementById("solve-image-main-container")
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
    
    // Store correct answers for this level
    imageContainer.correctAnswers = correctAnswers
}

// Load initial image set
loadImageSet("./images", [2, 4, 7, 8], "traffic lights", "Select all images with")

// Handle verify button click
document.getElementById("verify").addEventListener("click",()=> {
    const correctAnswers = [2, 4, 7, 8]
    
    // Check if selected images match correct answers
    if (selectedImages.size === correctAnswers.length && 
        correctAnswers.every(img => selectedImages.has(img))) {
        
        // Correct! Load next level
        currentLevel = 2
        loadImageSet(
            "./images2", 
            [1, 3, 5, 9], // Change these to the correct answers for level 2
            "stop signs",  // Change to your desired title
            "Select all images with"
        )
    } else {
        // Incorrect, show error
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

const userInputBox = document.getElementsByClassName('search-bar')[0];
const searchButton = document.querySelector('button');
const resultContainer = document.getElementById('result');
const modalBackground = document.getElementsByClassName('close-modal')[0]
const ingredientContainer = document.getElementsByClassName('modal-container')[0]
const closeIcon = document.getElementById('close')

const getUserInput = () => {
  const userInputValue = userInputBox.value;
  const mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInputValue}`;

  fetch(mealUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(res => {
      if (res.meals) {
        showResponse(res.meals);
        console.log(res.meals);
      } else {
        alert('The recipe you entered is not found')      }
    })
    .catch(error => {
      console.log("Error:", error);
    });
};

const showResponse = (meals) => {
  resultContainer.innerHTML = "";

  meals.forEach((meal) => {
    const imageUrl = meal.strMealThumb;
    const nameContent = meal.strMeal;
    const instructionContent = meal.strInstructions;
  
    const mealContainer = document.createElement('div');
    mealContainer.style.cssText = 'display: flex; flex-direction: column; justify-content: center; flex: 0 0 calc(33.33% - 20px); margin: 10px;';
    mealContainer.classList.add('meal-container');
  
    const image = document.createElement('img');
    image.style.cssText = 'height: 400px; cursor: pointer; border-radius: 10px;';
    image.src = imageUrl;
  
    const name = document.createElement('p');
    name.textContent = nameContent; 
    name.style.cssText='text-align:center; font-size:20px; font-weight:600;'

    mealContainer.append(image, name);
  
    // Clone the 'name' element before passing it to 'showIngredients'
    const clonedName = name.cloneNode(true);
  
    image.onclick = () => {
      closeModal();
      showIngredients(meal, clonedName); // Use the clonedName instead of name

    };
  
    resultContainer.appendChild(mealContainer);
  });

  
};

const showIngredients = (meal,name) => {
  ingredientContainer.textContent= ""
  const ingredientList = document.createElement('ul');

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    if (ingredient) {
      const listItem = document.createElement('li');
      listItem.style = 'color:black;font-size:20px;display: flex;line-height:30px'
      listItem.textContent = `${ingredient}`;
      ingredientList.appendChild(listItem);
    }
  }
  name.style.cssText = 'text-align:center; font-size:50px; color:black;'
  ingredientContainer.append(name,ingredientList)
}

const handleKeyPress = (event) => {
  if (event.keyCode === 13) {
    getUserInput();
  }
};

const closeModal = () => {
  modalBackground.classList.toggle('close-modal')
  modalBackground.classList.toggle('modal')
}

document.addEventListener('keyup', (event) => {
  // Check if the pressed key is the Escape key (key code 27)
  if (event.key === 'Escape' || event.keyCode === 27) {
    closeModal();
  }
});
closeIcon.onclick = () => {
  closeModal()
}
userInputBox.addEventListener('keypress', handleKeyPress);

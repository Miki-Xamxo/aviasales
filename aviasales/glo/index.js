const formSearch = document.querySelector('.form-search')
const inputCitiesFrom = document.querySelector('.input__cities-from')
const dropdownCitiesFrom = document.querySelector('.dropdown__cities-from')
const inputCitiesTo = document.querySelector('.input__cities-to')
const dropdownCitiesTo = document.querySelector('.dropdown__cities-to')
const inputDateDepart = document.querySelector('.input__date-depart')

// База данных городов

const city = ['Москва', 'Санкт-Петербург', 'Минск', 
'Караганда', 'Челябинск', 'Керчь', 'Волгоград', 
'Самара', 'Днепропетровск', 'Екатеринбург', 
'Одесса', 'Ухань', 'Шышкен', 'Нижний Новгород', 
'Калининград', 'Вроцлав', 'Ростов-на-Дону'];


// Функции

const showCity = (input, list) => {
  list.textContent = ''

  if(input.value !== ''){
    const filterCity = city.filter((item) => {
      const fixItem = item.toLowerCase();
      return fixItem.includes(input.value.toLowerCase())
    });
    filterCity.forEach((item) => {
      const li = document.createElement('li')
      li.classList.add('dropdown__city')
      li.textContent = item
      list.append(li)
    })
  }
}

const selectCity = (input, list, event) => {
  const target = event.target
  if(target.tagName.toLowerCase() === 'li'){
    input.value = target.textContent
    list.textContent = ''
  }
}

// Обработчики событий 

inputCitiesFrom.addEventListener('input', () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom)
})

inputCitiesTo.addEventListener('input', () => {
  showCity(inputCitiesTo,  dropdownCitiesTo)
})

dropdownCitiesFrom.addEventListener('click', (event) => {
  selectCity(inputCitiesFrom, dropdownCitiesFrom, event)
})

dropdownCitiesTo.addEventListener('click', (event) => {
  selectCity(inputCitiesTo, dropdownCitiesTo, event)
})

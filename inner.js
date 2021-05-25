const formSearch = document.querySelector('.form-search')
const wrapperSearch = document.querySelector('.wrapper-search')
const whereFlyFrom = document.querySelector('.where-fly-from')
const whereFly = document.querySelector('.where-fly')
const listCitiesForm = document.querySelector('.list-cities-form')
const listCitiesTo = document.querySelector('.list-cities-to')
const inputDateDepart = document.querySelector('.input-date-depart')
const backInputDateDepart = document.querySelector('.back-input-date-depart')
const aviaFormPassengers = document.querySelector('.avia-form-passengers')
const inputModal = document.querySelectorAll('input-modal')
const exp = document.querySelector('.exp')
const passengerList = document.querySelector('.passenger-list')


let requestURL = 'https://jsonplaceholder.typicode.com/users'

let xhr = new XMLHttpRequest()

let city = ['Назрань', 'Москва', 'Сочи', 'Санкт-Петербург', 'Минск', 
'Караганда', 'Челябинск', 'Керчь', 'Волгоград', 
'Самара', 'Днепропетровск', 'Екатеринбург', 
'Одесса', 'Ухань', 'Шышкен', 'Нижний Новгород', 
'Калининград', 'Вроцлав', 'Ростов-на-Дону']

  let nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  let today = new Date();

const showCity = (input, list) => {
  list.textContent = ''

  if(input.value !== ''){
    const filterCity = city.filter(item => {
      const fixItem = item.toLowerCase()
      return fixItem.includes(input.value.toLowerCase())
    })
    filterCity.forEach(item => {
      const li = document.createElement('li')
      li.classList.add('dropdown-city')
      li.textContent = item
      list.append(li)
    })
  }
}

const selectCity = (input, list, event) => {
  if(event.target.tagName.toLowerCase() === 'li'){
    input.value = event.target.textContent
    list.textContent = ''
  }
}



const numberPassendgers = (event) => {
  // if(event.target.classList.contains('avia-form-passengers')){
    aviaFormPassengers.classList.toggle('frame')
    exp.classList.toggle('in')
    passengerList.classList.toggle('hide')
    console.log(event.target)
  // } 
  
}


// const toogleModalAuth = (event) => {
//   if(event.target.classList.contains('input-modal')){
//     inputModal.classList.toggle('frame')
//     console.log(event.target)
//   }
// }

const formatDate = (date) => {
  let month = date.getMonth() + 1
  let day = date.getDate()
  let year = date.getFullYear()
    
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return ((([year, month, day].join('-'))));
}   


whereFlyFrom.addEventListener('input', () => {
  showCity(whereFlyFrom, listCitiesForm )
})

whereFly.addEventListener('input', () => {
  showCity(whereFly, listCitiesTo)
})

listCitiesForm.addEventListener('click', (event) => {
  selectCity(whereFlyFrom, listCitiesForm, event)
})

listCitiesTo.addEventListener('click', (event) => {
  selectCity(whereFly, listCitiesTo, event)
})
aviaFormPassengers.addEventListener('click', numberPassendgers)
// formSearch.addEventListener('click', toogleModalAuth)


inputDateDepart.min =  formatDate(today)
inputDateDepart.max = formatDate(nextYear)
backInputDateDepart.min = formatDate(today)
backInputDateDepart.max = formatDate(nextYear)
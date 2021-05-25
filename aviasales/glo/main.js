const formSearch = document.querySelector('.form-search')
const inputCitiesFrom = document.querySelector('.input__cities-from')
const dropdownCitiesFrom = document.querySelector('.dropdown__cities-from')
const inputCitiesTo = document.querySelector('.input__cities-to')
const dropdownCitiesTo = document.querySelector('.dropdown__cities-to')
const inputDateDepart = document.querySelector('.input__date-depart')

const cheapestTicket = document.getElementById('cheapest-ticket')
const otherCheapTickets = document.getElementById('other-cheap-tickets')

// данные
// День 2
const citieasApi = 'dataBase/cities.json'
const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = '4afff446c1d6427e79462e179c491430'
const calendar = 'http://min-prices.aviasales.ru/calendar_preload'
const MAX_COUNT = 10

let city = []
// 2
// Функции

//  День 2
const getData = (url, callback, reject = console.error) => {
    const request = new XMLHttpRequest()

    request.open('GET', url)

    request.addEventListener('readystatechange', () => {
      if(request.readyState !== 4) return

      if(request.status === 200){
        callback(request.response)
      }else{
        reject(request.status)
      }

    })

    request.send()
}

// 2
const showCity = (input, list) => {
  list.textContent = ''

  if(input.value !== ''){
    const filterCity = city.filter((item) => {
      // if(item.name){
        const fixItem = item.name.toLowerCase();
        return fixItem.startsWith(input.value.toLowerCase())
      // }  
    });
    filterCity.forEach((item) => {
      const li = document.createElement('li')
      li.classList.add('dropdown__city')
      li.textContent = item.name
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

const getNameCity = (code) => {
  const objCity = city.find((item) => item.code === code)
  return objCity.name
}

const getDate = (date) => {
  return new Date(date).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}


const getChanges = (num) => {
  if(num){
    return num === 1 ? 'С одной пересадкой': 'С двумя пересадками'
  }else{
    return 'Без пересадок'
  }
}

const getLinkAviasales = (data) => {
  let link = 'https://www.aviasales.ru/search/'

  link += data.origin

  const date = new Date(data.depart_date)

  const day = date.getDate()

  link += day < 10 ? '0' + day : day

  const month = date.getMonth() + 1

  link += month < 10 ? '0' + month : month

  link += data.destination
  link += '1'

  return link
}


const createCard = (data) => {
  const ticket = document.createElement('article')
  ticket.classList.add('ticket')

  let deep = ''

  if(data){
    deep = `
    <h3 class="agent">${data.gate}</h3>
    <div class="ticket__wrapper">
      <div class="left-side">
        <a href="${getLinkAviasales(data)}" target="_blank"" class="button button__buy">Купить
          за ${data.value}₽</a>
      </div>
      <div class="right-side">
        <div class="block-left">
          <div class="city__from">Вылет из города
            <span class="city__name">${getNameCity(data.origin)}</span>
          </div>
          <div class="date">${getDate(data.depart_date)}</div>
        </div>

        <div class="block-right">
          <div class="changes">${getChanges(data.number_of_changes)}</div>
          <div class="city__to">Город назначения:
            <span class="city__name">${getNameCity(data.destination)}</span>
          </div>
        </div>
      </div>
    </div>
    `
  }else{
    deep = '<h3>К сожалению на текущую дату билетов не нашлось!<h3>'
  }

  ticket.insertAdjacentHTML('afterbegin', deep)

  return ticket;
}

// День 3
const renderCheepDay = (cheepTicket) => {
  cheapestTicket.style.display = 'block'
  cheapestTicket.innerHTML = '<h2>Самый дешевый билет на выбранную дату</h2>'
  const ticket = createCard(cheepTicket[0])

  cheapestTicket.append(ticket)
}
const renderCheepYear = (cheepTickets) => {
  otherCheapTickets.style.display = 'block'
  otherCheapTickets.innerHTML = '<h2>Самые дешевые билеты на другие даты</h2>'
  
  cheepTickets.sort((a, b) => a.value - b.value) 

  for(let i = 0; i < cheepTickets.length && i < MAX_COUNT; i++){
    const ticket = createCard(cheepTickets[i])
    otherCheapTickets.append(ticket)
  }

  console.log(cheepTickets)
}

const renderCheep = (data, date) => {
  const cheepTicketYear = JSON.parse(data).best_prices
  
  const cheepTicketDay = cheepTicketYear.filter((item) => {
    return item.depart_date === date
  })

  renderCheepDay(cheepTicketDay)
  renderCheepYear(cheepTicketYear)
}
// 3


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

// День 3
formSearch.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = {
    from: city.find((item) => inputCitiesFrom.value === item.name),
    to:  city.find((item) => inputCitiesTo.value === item.name),
    when: inputDateDepart.value,
  }

  if(formData.from && formData.to){

    const requestData = `?depart_date=${formData.when}&origin=${formData.from.code}` +
                        `&destination=${formData.to.code}&one_way=true`

    getData(calendar + requestData, (response) => {
      renderCheep(response, formData.when)
    }, (e) => {
      alert('В этом направлении нет рейсов')
    })
  }else{
    alert('Введите корректное название города!')
  }  
})
    
// 3

// вызовы функций
// День 2
getData(citieasApi, (data) => {
  city = JSON.parse(data).filter(item => item.name)
  
  city.sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  
  return 0;
  });
})
// 2
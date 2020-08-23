const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


//e is an event object provided to the callback
weatherForm.addEventListener('submit', (e) =>{
    //preevents default behaviour of form submission that immediately refreshes the browser
    e.preventDefault()
    const location = search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }

        })
    })

    console.log(location)
})
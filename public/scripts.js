// const route = 'http://byob-crspr.herokuapp.com'
const route = 'http://localhost:6333'

const email = $('#email')
const appNames = $('#appName')
const submitBtn = $('#submit-btn')

const getAdmin = data => {

  fetch(`${route}/api/v1/admin`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"ContentType": "application/json"}
  })
  .then(resp => resp.json(resp))
  .then(user => console.log('user: ', user))
  .catch(error => console.log('error at admin', error))
}

submitBtn.on('click', () => {
  const emailVal = email.val()
  const appNameVal = appNames.val()

  getAdmin({ password: appNameVal, email: emailVal })
})

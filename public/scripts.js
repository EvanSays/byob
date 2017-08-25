// const route = 'http://byob-crspr.herokuapp.com/'
const route = 'http://localhost:6333/'

const email = $('#email')
const appNames = $('#appName')
const submitBtn = $('#submit-btn')
const adminPrint = $('#admin-view')

const adminView = userData => {

  adminPrint.empty()
  adminPrint.append(
    `
    <h5 id="view-email">Email: ${userData.email}</h5>
    <h5 id="view-appName">App Name: ${userData.appName}</h5>
    <h5 id="view-admin">Admin Status: ${userData.admin}</h5>
    `
  )
}

const getAdmin = data => {

  fetch('api/v1/admin/', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => resp.json())
  .then(user => adminView(user))
  .catch(error => console.log('error at admin', error))
}

submitBtn.on('click', () => {
  const emailVal = email.val()
  const appNameVal = appNames.val()

  getAdmin({ appName: appNameVal, email: emailVal })
})

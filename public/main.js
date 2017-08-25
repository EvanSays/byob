const email = $('#email')
const appNames = $('#appName')
const submitBtn = $('#submit-btn')
const adminPrint = $('#key-container')

const adminView = (key) => {

  adminPrint.empty()
  adminPrint.append(
    `
    <p>${key}</p>
    `
  )
}

const login = (data) => {

  fetch('api/v1/admin/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => adminView(data))
  .catch(error => console.log('error at admin', error))
}

submitBtn.on('click', () => {
  const emailVal = email.val()
  const appNameVal = appNames.val()

  login({ appName: appNameVal, email: emailVal })
})

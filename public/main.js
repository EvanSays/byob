const email = $('#email');
const appNames = $('#appName');
const submitBtn = $('#submit-btn');
const adminPrint = $('#key-container');

const adminView = (key) => {
  adminPrint.empty();
  adminPrint.append(
    `
    <p>${key.token}</p>
    `,
  );
};

const login = (data) => {
  fetch('api/v1/admin/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(key => adminView(key));
};

submitBtn.on('click', () => {
  const emailVal = email.val();
  const appNameVal = appNames.val();

  login({ appName: appNameVal, email: emailVal });
});

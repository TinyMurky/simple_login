const submitForm = [...document.querySelector(".form").children]

const formName = document.querySelector(".name") || null
const formEmail = document.querySelector(".email")
const formPassword = document.querySelector(".password")
const subButton = document.querySelector(".submit-btn")

/*
window.onload = () => {
  location.href = "/"
}
*/
submitForm.forEach((item, index) => {
  setTimeout(() => {
    item.style.opacity = 1
  }, index * 200)
})

subButton.addEventListener("click", submit)

async function submit() {
  if (!validation()) {
    return
  }
  const data = {
    email: formEmail.value,
    password: formPassword.value,
  }
  let response
  if (formName) {
    data.name = formName.value
    response = await postForm("/register", data)
  } else {
    response = await postForm("/login", data)
  }
  if (response.redirected) {
    window.location.href = response.url
  } else {
    //response is an promise
    //respnse.json().then() can get the alert message
    response.json().then((alertObject) => {
      alertBox(alertObject.alert)
    })
  }
}

async function postForm(url = "", data = {}) {
  try {
    //create encoded data
    const formBody = []
    for (let property in data) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(data[property])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: formBody.join("&"),
    })
    return response
  } catch (error) {
    console.error("Error in fetching POST to server", error)
    throw Error(error)
  }
}
function alertBox(data) {
  const alertContainer = document.querySelector(".alert-box")
  const alert = document.querySelector(".alert")
  alert.textContent = String(data)
  alertContainer.style.top = "0%"
  setTimeout(() => {
    alertContainer.style.top = null
  }, 5000)
}

function validation() {
  if (formName && !formName.value) {
    alertBox("Name is needed")
    return false
  }
  if (!(formEmail.value && formPassword.value)) {
    alertBox("All data is needed")
    return false
  }
  const emailRegTest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formEmail.value)
  if (!emailRegTest) {
    alertBox("Bad email")
    return false
  }
  return true
}

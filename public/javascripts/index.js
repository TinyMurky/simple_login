import { postForm } from "./postForm.js"
const logoutBtn = document.querySelector(".logout")
logoutBtn.addEventListener("click", logout)

async function logout() {
  const response = await postForm("/logout", {})
  window.location.href = response.url
}

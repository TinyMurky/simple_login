export async function postForm(url = "", data = {}) {
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

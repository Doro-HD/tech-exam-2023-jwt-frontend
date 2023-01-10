const API_URL = 'http://127.0.0.1:8080'

//Denne funktion er udleveret af programmerings/teknik underviser Lars Åke Mortensen
async function handleHttpErrors(res) {
    if (!res.ok) {
      const errorResponse = await res.json();
      const error = new Error(errorResponse.message)
      error.apiError = errorResponse
      throw error
    }
    
    return res.json()
}
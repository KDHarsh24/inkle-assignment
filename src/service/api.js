const BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io'

export async function fetchTaxes() {
  const res = await fetch(`${BASE_URL}/taxes`)
  const json = await res.json()
  return json.value || json
}

export async function fetchCountries() {
  const res = await fetch(`${BASE_URL}/countries`)
  const json = await res.json()
  return json.value || json
}

export async function updateTax(id, data) {
  const res = await fetch(`${BASE_URL}/taxes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

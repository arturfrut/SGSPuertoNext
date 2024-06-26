async function getProducts() {
  const fetchData = await fetch('http://localhost:3000/api/products', {
    headers: { 'Content-Type': 'application/json' }
  })
  const res = await fetchData.json()
  return res
}

const product = async () => {
  const products = await getProducts()
  console.log('productos',products)
  return (
    <>
    <h1>Hola</h1>
      <h1>{products[0]?.name}</h1>
    </>
  )
}

export default product

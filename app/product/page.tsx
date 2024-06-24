async function getProducts() {
  const fetchData = await fetch('http://localhost:3000/api/products', {
    headers: { 'Content-Type': 'application/json' }
  })
  const res = await fetchData.json()
  return res
}

const product = async () => {
  const {products} = await getProducts()
  console.log(products)
  products && console.log(products[0])
  // console.log(products[0].name)
  return (
    <>
    <h1>Hola</h1>
      <h1>{products[1]?.name}</h1>
    </>
  )
}

export default product

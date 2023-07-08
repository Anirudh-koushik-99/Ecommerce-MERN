import { useGetProductsQuery } from '../slices/productsApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'


const HomeScreen = () => {
  const {data: products, isLoading, error} = useGetProductsQuery();
  const dispatch = useDispatch()
  
  return (
    <>
      {isLoading ? (<h1>Loading....</h1>) : error ? (<div>{error?.data?.message || error.error}</div>) : (<>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
        ))}
      </Row></>) }
      
    </>
  )
}

export default HomeScreen

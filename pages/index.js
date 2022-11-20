import Featured from '../components/Featured'
import { PizzaList } from '../components/PizzaList'
import axios from 'axios'

export default function Home({pizzaList}) {
  return (
    <>
      <Featured/>
      <PizzaList pizzaList={pizzaList}/>
    </>
  )
}

export const getServerSideProps = async () =>{
  const res= await axios.get("http://localhost:3000/api/products")
  return{
    props:{
      pizzaList:res.data
    }
  }
}

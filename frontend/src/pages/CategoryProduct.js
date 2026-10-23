import { useSearchParams } from 'react-router-dom'
import CategoryWiseProductDisplay from '../componentes/CategoryWiseProductDisplay'

const CategoryProduct = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || ''

  return <CategoryWiseProductDisplay category={category} heading={category} />
}

export default CategoryProduct
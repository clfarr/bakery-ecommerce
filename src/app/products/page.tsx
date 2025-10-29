import { Suspense } from 'react'
import ProductsList from '@/components/ProductsList'

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
      <ProductsList />
    </Suspense>
  )
}

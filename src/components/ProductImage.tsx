import Image from 'next/image'
import { Product } from '@/types'

interface ProductImageProps {
  product: Product
  size?: 'small' | 'medium' | 'large' | 'xl'
  className?: string
}

export default function ProductImage({ product, size = 'medium', className = '' }: ProductImageProps) {
  const sizeClasses = {
    small: 'h-32',
    medium: 'h-64',
    large: 'h-96',
    xl: 'h-[500px]',
  }

  const emojiSizes = {
    small: 'text-4xl',
    medium: 'text-8xl',
    large: 'text-[150px]',
    xl: 'text-[200px]',
  }

  if (product.image) {
    return (
      <div className={`relative ${sizeClasses[size]} ${className} overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    )
  }

  // Fallback to emoji if no image
  return (
    <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center`}>
      <span className={emojiSizes[size]}>{product.emoji}</span>
    </div>
  )
}

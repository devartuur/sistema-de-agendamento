import { ValueObject } from '@/core/entities/value-object'
import { getProductMetadata } from '../../utils/product-metadata'
import { InternalProductId } from '../../enums/internal-product-id'
import { Metadata } from '../../types/metadata'

export interface ProductProps extends Metadata {
  id: InternalProductId
}

export class Product extends ValueObject<ProductProps> {
  get id() {
    return this.props.id
  }

  get amount() {
    return this.props.amount
  }

  get isOneTimePurchase() {
    return this.props.type === 'one-time-purchase'
  }

  get isInternal() {
    return this.props.type === 'internal'
  }

  get isValid() {
    return this.props.id !== InternalProductId.Unknown
  }

  get googleProductId() {
    return this.props.google.productId || 'unknown'
  }

  get googleBaseProductId() {
    return this.props.google.baseProductId || 'unknown'
  }

  get appleProductId() {
    return this.props.apple.productId || 'unknown'
  }

  get appleBaseProductId() {
    return this.props.apple.baseProductId || 'unknown'
  }

  private constructor(props: ProductProps) {
    super(props)
  }

  public static create(productId: InternalProductId): Product {
    const metadata = getProductMetadata(productId)

    return new Product({
      id: productId,
      ...metadata,
    })
  }
}

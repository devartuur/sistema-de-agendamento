import { InternalProductId } from '../../enums/internal-product-id'
import {
  AppleProductId,
  AppleBaseProductId,
} from '../../types/apple-product-id'
import {
  GoogleProductId,
  GoogleBaseProductId,
} from '../../types/google-product-id'
import { mapStoreProductToInternalProductId } from '../../utils/map-store-product-to-internal-product-id'

type StoreProduct = {
  storeProductId: string
  storeBaseProductId: string
}

export class ProductId {
  public value: InternalProductId

  private constructor(value: InternalProductId) {
    this.value = value
  }

  public is(productId: InternalProductId): boolean {
    return this.value === productId
  }

  static create(value: InternalProductId) {
    return new ProductId(value)
  }

  /**
   * Receives store product information and returns a normalized product name.
   */
  static createFromStoreProduct({
    storeProductId,
    storeBaseProductId,
  }: StoreProduct): ProductId {
    const productId = mapStoreProductToInternalProductId({
      storeProductId: storeProductId as GoogleProductId | AppleProductId,
      storeBaseProductId: storeBaseProductId as
        | GoogleBaseProductId
        | AppleBaseProductId,
    })

    return this.create(productId)
  }
}

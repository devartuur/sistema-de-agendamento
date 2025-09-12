import { AppleBaseProductId, AppleProductId } from '../types/apple-product-id'
import {
  GoogleBaseProductId,
  GoogleProductId,
} from '../types/google-product-id'
import { InternalProductId } from '../enums/internal-product-id'

export type StoreProduct = {
  storeProductId: GoogleProductId | AppleProductId
  storeBaseProductId: GoogleBaseProductId | AppleBaseProductId
}

export const mapStoreProductToInternalProductId = (
  product: StoreProduct,
): InternalProductId => {
  const { storeBaseProductId, storeProductId } = product

  const normalized = `${storeBaseProductId || storeProductId}`.toLowerCase()

  if (
    normalized.includes('photo_pack_10') ||
    normalized.includes('photo-pack-10')
  ) {
    return InternalProductId.PhotoPack10
  }

  if (
    normalized.includes('photo_single') ||
    normalized.includes('photo-single')
  ) {
    return InternalProductId.PhotoSingle
  }

  return InternalProductId.Unknown
}

import { InternalProductId } from '@/core/product/enums/internal-product-id'
import { Metadata } from '../types/metadata'
import { AppleBaseProductId, AppleProductId } from '../types/apple-product-id'
import {
  GoogleBaseProductId,
  GoogleProductId,
} from '../types/google-product-id'

export const ProductMetadata: Record<InternalProductId, Metadata> = {
  [InternalProductId.PhotoPack10]: {
    type: 'one-time-purchase',
    amount: 10,
    google: {
      productId: GoogleProductId.PhotoPack10,
      baseProductId: GoogleBaseProductId.PhotoPack10,
    },
    apple: {
      productId: AppleProductId.PhotoPack10,
      baseProductId: AppleBaseProductId.PhotoPack10,
    },
  },
  [InternalProductId.PhotoSingle]: {
    type: 'one-time-purchase',
    amount: 1,
    google: {
      productId: GoogleProductId.PhotoSingle,
      baseProductId: GoogleBaseProductId.PhotoSingle,
    },
    apple: {
      productId: AppleProductId.PhotoSingle,
      baseProductId: AppleBaseProductId.PhotoSingle,
    },
  },
  [InternalProductId.Unknown]: {
    type: 'internal',
    amount: 0,
    google: { productId: 'unknown', baseProductId: 'unknown' },
    apple: { productId: 'unknown', baseProductId: 'unknown' },
  },
}

export const getProductMetadata = (product: InternalProductId): Metadata => {
  try {
    return ProductMetadata[product]
  } catch (error) {
    throw new Error(
      `Invalid product name "${product}". Please check the product name. ${error}`,
    )
  }
}

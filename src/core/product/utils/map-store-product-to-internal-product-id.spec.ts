import { describe, it, expect } from 'vitest'
import {
  mapStoreProductToInternalProductId,
  StoreProduct,
} from './map-store-product-to-internal-product-id'
import { InternalProductId } from '../enums/internal-product-id'
import {
  GoogleBaseProductId,
  GoogleProductId,
} from '../types/google-product-id'
import { AppleBaseProductId, AppleProductId } from '../types/apple-product-id'

const cases: Array<{
  input: StoreProduct
  expected: InternalProductId
}> = [
  // Google - Photo Pack 10
  {
    input: {
      storeProductId: GoogleProductId.PhotoPack10,
      storeBaseProductId: GoogleBaseProductId.PhotoPack10,
    },
    expected: InternalProductId.PhotoPack10,
  },
  // Google - Photo Single
  {
    input: {
      storeProductId: GoogleProductId.PhotoSingle,
      storeBaseProductId: GoogleBaseProductId.PhotoSingle,
    },
    expected: InternalProductId.PhotoSingle,
  },
  // Apple - Photo Pack 10
  {
    input: {
      storeProductId: AppleProductId.PhotoPack10,
      storeBaseProductId: AppleBaseProductId.PhotoPack10,
    },
    expected: InternalProductId.PhotoPack10,
  },
  // Apple - Photo Single
  {
    input: {
      storeProductId: AppleProductId.PhotoSingle,
      storeBaseProductId: AppleBaseProductId.PhotoSingle,
    },
    expected: InternalProductId.PhotoSingle,
  },
]

describe('[Map Store Product To Internal Product Id]', () => {
  cases.forEach(({ input, expected }) => {
    it(`should map ${input.storeProductId} to ${expected}`, () => {
      expect(mapStoreProductToInternalProductId(input)).toBe(expected)
    })
  })

  it('should return Unknown for invalid product ids', () => {
    const result = mapStoreProductToInternalProductId({
      storeProductId: 'invalid_id' as any,
      storeBaseProductId: 'invalid_base' as any,
    })
    expect(result).toBe(InternalProductId.Unknown)
  })
})

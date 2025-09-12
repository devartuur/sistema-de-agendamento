import { InternalProductId } from '../enums/internal-product-id'
import { AppleBaseProductId, AppleProductId } from '../types/apple-product-id'
import {
  GoogleBaseProductId,
  GoogleProductId,
} from '../types/google-product-id'
import { getProductMetadata, ProductMetadata } from './product-metadata'
import { describe, it, expect } from 'vitest'

// Valid product name cases
const allCases = [
  {
    name: InternalProductId.PhotoPack10,
    expected: {
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
  },
  {
    name: InternalProductId.PhotoSingle,
    expected: {
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
  },

  // Unknown
  {
    name: InternalProductId.Unknown,
    expected: {
      type: 'internal',
      amount: 0,
      google: {
        productId: 'unknown',
        baseProductId: 'unknown',
      },
      apple: {
        productId: 'unknown',
        baseProductId: 'unknown',
      },
    },
  },
]

const validProductNames = allCases.map((c) => c.name)

describe('[Get Product Metadata]', () => {
  allCases.forEach(({ name, expected }) => {
    it(`should return correct meta for "${name}"`, () => {
      expect(getProductMetadata(name as any)).toEqual(expected)
      expect(ProductMetadata[name as keyof typeof ProductMetadata]).toEqual(
        expected,
      )
    })
  })

  it('should return error for unknown product name', () => {
    expect(getProductMetadata('invalid.product' as any)).toThrowError(Error)
    expect(getProductMetadata('' as any)).toThrowError(Error)
    expect(getProductMetadata(null as any)).toThrowError(Error)
    expect(getProductMetadata(undefined as any)).toThrowError(Error)
  })

  it('should not have unexpected keys in ProductMeta', () => {
    for (const key of Object.keys(ProductMetadata)) {
      expect(validProductNames).toContain(key)
    }
  })
})

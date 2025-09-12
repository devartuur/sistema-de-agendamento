import { AppleBaseProductId, AppleProductId } from './apple-product-id'
import { GoogleBaseProductId, GoogleProductId } from './google-product-id'

export type Metadata = {
  type: 'one-time-purchase' | 'internal'
  amount: number
  google: {
    productId: GoogleProductId | 'unknown'
    baseProductId: GoogleBaseProductId | 'unknown'
  }
  apple: {
    productId: AppleProductId | 'unknown'
    baseProductId: AppleBaseProductId | 'unknown'
  }
}

// Supplied available ring sizes from DEXYFIED inventory
// Preserved exact list: 6, 7, 9, 10, 11, 12, 17, 20, 21
export const AVAILABLE_RING_SIZES = ['6', '7', '9', '10', '11', '12', '17', '20', '21'] as const;

export type RingSize = typeof AVAILABLE_RING_SIZES[number];

/**
 * Checks if a product requires ring-size selection.
 * Currently strictly matches the finger ring product in catalog.
 */
export function isRingProduct(product: { id?: string; slug?: string; name?: string; category?: string }): boolean {
  if (!product) return false;
  if (product.id === 'prod-04') return true;
  if (product.slug === 'luminous-heartbeat-pattern-finger-ring') return true;
  if (product.name?.toLowerCase().includes('finger ring') || product.name?.toLowerCase().includes('luminous heartbeat')) {
    return true;
  }
  return false;
}

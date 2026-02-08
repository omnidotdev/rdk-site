import AetherBillingProvider from "./aether.provider";

export type {
  BillingProvider,
  CheckoutParams,
  Entitlement,
  EntitlementsResponse,
  Price,
  Subscription,
} from "./interface";

/**
 * Singleton billing provider instance.
 */
const billing = new AetherBillingProvider();

export default billing;

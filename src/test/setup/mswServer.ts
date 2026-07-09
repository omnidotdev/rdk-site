import { setupServer } from "msw/node";

import { handlers } from "../mocks";

/**
 * MSW server instance with all mock handlers.
 */
export const mswServer = setupServer(...handlers);

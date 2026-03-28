import { User } from "@shopping-list/domain";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
// Type declarations for JavaScript modules

declare module './routes/userRoutes' {
  import { Router } from 'express';
  const router: Router;
  export = router;
}

declare module './routes/categoryRoutes' {
  import { Router } from 'express';
  const router: Router;
  export = router;
}

declare module './routes/serviceRoutes' {
  import { Router } from 'express';
  const router: Router;
  export = router;
}

declare module './routes/orderRoutes' {
  import { Router } from 'express';
  const router: Router;
  export = router;
}

declare module './routes/reviewRoutes' {
  import { Router } from 'express';
  const router: Router;
  export = router;
}

declare module './controllers/stripPayment' {
  import { Request, Response } from 'express';
  export function makePayment(req: Request, res: Response): Promise<void>;
}

declare module './middlewares/verfiyUserToken' {
  import { Request, Response, NextFunction } from 'express';
  function verfiyUserToken(req: Request, res: Response, next: NextFunction): void;
  export = verfiyUserToken;
}

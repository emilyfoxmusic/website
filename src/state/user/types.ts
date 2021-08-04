export type Principal =
  | {
      isAuthenticated: false;
      isAdmin: false;
    }
  | {
      isAuthenticated: true;
      isAdmin: boolean;
      username: string;
    };

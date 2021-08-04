export type Principal = AnonymousPrincipal | AuthenticatedPrincipal;

export type AnonymousPrincipal = {
  isAuthenticated: false;
  isAdmin: false;
};

export type AuthenticatedPrincipal = {
  isAuthenticated: true;
  token: string;
  isAdmin: boolean;
  username: string;
  expiryTime: Date;
};

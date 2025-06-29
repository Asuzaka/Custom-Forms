export const route = {
  AUTH: {
    SIGNIN: {
      ROOT: "/signin",
    },
    SIGNUP: {
      ROOT: "/signup",
    },
  },
  DASHBOARD: {
    ROOT: "/dashboard",
  },
  TEMPLATE: {
    DETAIL: "/template/:id",
    CREATE: "/newtemplate",
  },
  FORM: {
    ROOT: "/form/:id",
  },
  GITHUB: {
    ROOT: "/github/callback",
  },
  NOTFOUND: {
    ROOT: "*",
  },
};

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
  FORM: {
    DETAIL: "/form/:id",
    CREATE: "/newform",
  },
  SUBMIT: {
    ROOT: "/submit/:id",
  },
  GITHUB: {
    ROOT: "/github/callback",
  },
  NOTFOUND: {
    ROOT: "*",
  },
};

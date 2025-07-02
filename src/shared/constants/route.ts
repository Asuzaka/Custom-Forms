export const route = {
  AUTH: {
    SIGNIN: {
      ROOT: "/signin",
    },
    SIGNUP: {
      ROOT: "/signup",
    },
    VERIFY: {
      ROOT: "/verify/:token",
    },
    RESET: {
      ROOT: "/resetPassword/:token",
    },
    FORGET: {
      ROOT: "/forgetPassword",
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

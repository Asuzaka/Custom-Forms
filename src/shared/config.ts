type EnvType = {
  BACKEND_URL: string;
};

export const env: EnvType = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
};

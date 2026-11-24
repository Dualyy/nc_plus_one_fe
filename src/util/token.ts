const TOKEN = "plus_one"


export const readToken = (): string | null => {
  return localStorage.getItem(TOKEN);
};

export const writeToken = (token: string): void => {
   localStorage.setItem(TOKEN, token);
};

export const clearToken = (): void => {
   localStorage.removeItem(TOKEN);
};

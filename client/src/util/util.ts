import { jwtDecode } from "jwt-decode";

export function objToString (obj: any) {
  return Object.entries(obj).reduce((str, [p, val]) => {
    return `${str}${p}: ${val}\n`;
  }, '');
};

export function getUserFromJwt(token: string): string {
  const decoded = jwtDecode(token) as any;

  return decoded?.user_email;
}

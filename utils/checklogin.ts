export function CheckLogin(): boolean {
  if (typeof window !== 'undefined') {
    const user = window.localStorage.getItem('user');
    return user !== null;
  }
  return false;
}

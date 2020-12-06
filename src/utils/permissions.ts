const BORROW = 1;
const EDIT = 2;



export const setEdit = (permission: number):number => {
  return permission | (1 << EDIT);
}
export const unsetEdit = (permission: number):number => {
  return permission & (-1 ^ (1 << EDIT));
}
export const testEdit = (permission: number | null | undefined):boolean => {
  if (!permission) return false;
  return ((permission >> EDIT) & 1) == 1;
}

export const setBorrow = (permission: number):number => {
  return permission | (1 << BORROW);
}
export const unsetBorrow = (permission: number):number => {
  return permission & (-1 ^ (1 << BORROW));
}
export const testBorrow = (permission: number | null | undefined):boolean => {
  if (!permission) return false;
  return ((permission >> BORROW) & 1) == 1;
}


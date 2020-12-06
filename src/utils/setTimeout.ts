import { clear } from "console";

var asoalksdgfh:  any;

export const clearAndSetTimeout = (fn:Function, timeInSecond: number): void => {
  if (asoalksdgfh) clearTimeout(asoalksdgfh);
  asoalksdgfh = setTimeout(fn, timeInSecond * 1000);
}
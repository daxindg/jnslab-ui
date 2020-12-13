export enum BorrowState {
  PENDING_BORROW ,
  PENDING_RETURN,
  NORMAL,
  RETURNED,
  OVERTIME,
  OVERTIME_RETURNED
}

export const borrowStateDisplayName: Record<BorrowState, string> = {
  "0": "借等待",
  "1": "还等待",
  "2": "正常",
  "3": "已还",
  "4": "超时",
  "5": "已还",
}
export const borrowStateDisplayColor: Record<BorrowState, string> = {
  "0": "blue",
  "1": "blue",
  "2": "green",
  "3": "green",
  "4": "red",
  "5": "red",
}
import { FieldError } from "../generated/graphql";


export const mapToArray = (obj: any, fields: string[]):{first:string, second: string}[] => {
  const res:{first:string, second: string}[] = [];
  // if (fields)
  // for (const [a, b] in fields) {
  //   res.push({first: key, second: typeof obj[key] === "string" ? obj[key] : ""})
  // }

  return res.filter(e => e.second);
}
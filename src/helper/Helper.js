import { format as f } from "date-fns";
export const dateFormat = (date, format = "d-MM-yyyy h:mm:ss a") => {
  return f(new Date(date), format);
};

import request from "@/utils/request";

export const getPerson = async () => {
  return request('/api/persons')
}

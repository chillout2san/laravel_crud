export const createURLSearchParams = <T>(
  names: Array<keyof T>,
  values: string[]
) => {
  const params = new URLSearchParams()
  names.map((name, index) => params.append(name.toString(), values[index]))
  return params
}

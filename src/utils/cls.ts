export const cls = (base: string[], ...conds: string[][]) => {
  const cond = conds.flat()

  return [...base, ...cond].join(' ')
}

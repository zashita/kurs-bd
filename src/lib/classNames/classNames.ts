type Mods = Record<string, string | boolean>
export const classNames = (cls: string, additional?: string[]) =>{
  return[
    cls,
    ...additional,
    // ...Object.entries(mods)
    //   .filter(([className, value]) => Boolean(value))
    //   .map(([className, value]) => className)
  ]
    .join(' ');
}

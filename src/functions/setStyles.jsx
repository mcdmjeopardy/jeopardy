export function cx(styles, moduleClasslist, globalClasslist) {
  
  let mc = moduleClasslist
    .trim()
    .split(/\s+/)
    .map((i) => styles[i])
    .filter(Boolean)
    .join(" ");

  let gc = globalClasslist.trim();

  return mc + " " + gc;
}

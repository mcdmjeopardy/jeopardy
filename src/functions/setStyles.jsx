export function cx(styles, moduleClasslist, globalClasslist) {
  const mc = moduleClasslist
    .split(/\s+/)
    .map((i) => styles[i])
    .filter(Boolean)
    .join(" ");

  const classlist = mc + " " + globalClasslist.trim();

  return classlist;
}

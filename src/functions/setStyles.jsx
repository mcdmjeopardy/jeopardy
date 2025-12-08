export function cn(styles, moduleClasslist, globalClasslist) {
  // Turn module classlist into string of true module classes.
  const mc = moduleClasslist
    .split(/\s+/)
    .map((i) => styles[i])
    .filter(Boolean)
    .join(" ");

  const gc = globalClasslist.split(/\s+/).filter(Boolean).join(" ");

  // Combine module and global classes. Trim empty spaces from global classes.
  const classlist = `${mc} ${gc}`;

  // Trim in case one classlist is empty.
  return classlist.trim();
}

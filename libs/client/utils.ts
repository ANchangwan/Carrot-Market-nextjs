interface TypeResponse {
  type: "favs" | "sales" | "purchases";
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function type({ type }: TypeResponse) {
  switch (type) {
    case "fav":
      return "Fav";
    case "purchase":
      return "Purchase";
    case "sale":
      return "Sale";
    default:
      return res.json({ ok: false });
      break;
  }
}

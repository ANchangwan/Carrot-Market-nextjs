interface TypeResponse {
  type: "favs" | "sales" | "purchases";
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function type({ type }: TypeResponse) {
  switch (type) {
    case "favs":
      return "Fav";
    case "purchases":
      return "Purchase";
    case "sales":
      return "Sale";
    default:
      break;
  }
}

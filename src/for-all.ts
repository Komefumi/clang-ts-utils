export function toPascalCase(hyphenName: string): string {
  return hyphenName
    .split("-")
    .filter((piece) => piece.length)
    .map(
      (piece) => piece.charAt(0).toUpperCase() + piece.slice(1).toLowerCase()
    )
    .join("");
}

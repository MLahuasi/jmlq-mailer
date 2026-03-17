import { EmailAddress } from "../../../domain/object-values";

export function formatMailAddress(
  addr?: EmailAddress | EmailAddress[]
): string | undefined {
  if (!addr) return undefined;

  const arr = Array.isArray(addr) ? addr : [addr];
  return arr
    .map((x) =>
      typeof x === "string"
        ? x
        : x.getName()
        ? `${x.getName()} <${x.getEmail()}>`
        : x.getEmail()
    )
    .join(", ");
}

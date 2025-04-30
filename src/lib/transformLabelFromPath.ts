export function transformLabelFromPath(input: string = ""): string {
  return (
    (input.split(".").pop() ?? "")
      .replace(/[_-]/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2") //  a space between lowercase and uppercase letters
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/^./, (c) => c.toUpperCase()) ?? ""
  );
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export function generateRandomRating() {
  return Math.random() * (5 - 3) + 3;
  // return Math.random() * 5; // Generates a random floating-point number between 0 and 5
}

export function escapeString(value: string) {
  if (typeof value !== "string") {
    throw new Error("Input must be a string");
  }

  value = value.replace(/'/g, "''");

  value = value.replace(/\\/g, "\\\\");

  return value;
}

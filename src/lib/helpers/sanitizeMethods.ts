/**
 * Recursively removes methods from an object or an array of objects,
 * returning a plain, serializable object suitable for Client Components.
 * @param data The object or array of objects to sanitize.
 * @returns A sanitized, serializable version of the input data.
 */
export function sanitizeMethods<T>(data: T): T {
  if (Array.isArray(data)) {
    // If it's an array, sanitize each item
    return data.map((item) => sanitizeMethods(item)) as T;
  }

  if (data !== null && typeof data === "object" && !isPlainObject(data)) {
    // If it's a class instance or complex object, convert it to a plain object
    const sanitized: { [key: string]: any } = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        if (typeof value !== "function") {
          sanitized[key] = sanitizeMethods(value); // Recurse for nested objects
        }
      }
    }
    return sanitized as T;
  }

  // Return primitives and plain objects as-is
  return data;
}

// Helper to check if an object is a plain object vs. a class instance
function isPlainObject(obj: any): boolean {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(obj);
  if (proto === null) {
    return true; // e.g., Object.create(null)
  }
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}

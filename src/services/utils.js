export function nameToURL(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // elimina tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // espacios -> guiones
    .replace(/[^\w\-]+/g, "") // elimina caracteres no válidos
    .replace(/\-\-+/g, "-") // guiones múltiples
    .replace(/^-+/, "") // quita guiones al inicio
    .replace(/-+$/, ""); // quita guiones al final
}

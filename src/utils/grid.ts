/** Returns inline grid styles that adapt to item count. */
export function adaptiveGrid(count: number, gap = "1.25rem") {
  const cols =
    count <= 1 ? 1
    : count === 2 ? 2
    : 3;

  return {
    display: "grid" as const,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap,
    maxWidth: count === 1 ? 460 : count === 2 ? 740 : undefined,
    margin: count < 3 ? "0 auto" : undefined,
  };
}

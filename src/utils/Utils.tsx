/**
 * Function to prevent the default behavior of an event (dragging).
 * @param event The event object for which the default behavior needs to be prevented.
 */
export const preventDrag = (event: { preventDefault: () => void }) => {
  event.preventDefault();
};

export function addDragPreventionToImages(
  preventDrag: (event: DragEvent) => void
): () => void {
  const images = document.querySelectorAll(
    "img"
  ) as NodeListOf<HTMLImageElement>;
  images.forEach((image: HTMLImageElement) => {
    image.addEventListener("dragstart", preventDrag);
  });

  return () => {
    images.forEach((image: HTMLImageElement) => {
      image.removeEventListener("dragstart", preventDrag);
    });
  };
}

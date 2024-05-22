/**
 * Function to prevent the default behavior of an event (dragging).
 * @param event The event object for which the default behavior needs to be prevented.
 */
export const preventDrag = (event: { preventDefault: () => void }) => {
  event.preventDefault();
};

/**
 * Function to add drag prevention to all images on the page.
 * @param preventDrag The function to prevent dragging behavior.
 * @returns A cleanup function to remove event listeners.
 */
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

export function getLocationData(): Promise<unknown> {
  return fetch("http://localhost:3000/") // Replace with your backend URL
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the received data
      console.log(data); // Output the received data to the console
      return data; // Return the data from the promise chain
    })
    .catch((error) => {
      console.error("Error fetching data", error);
      throw error; // Throw the error to propagate it to the caller
    });
}

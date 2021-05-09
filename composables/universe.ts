import {
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect,
} from "@nuxtjs/composition-api";

export type UniverseInteractionMethod = "toggle" | "draw" | "erase";

export const useUniverse = () => {
  const canvasElement = ref<HTMLCanvasElement | null>(null);
  const canvasWidth = ref(0);
  const canvasHeight = ref(0);
  const cellSize = ref(0);
  const reset = ref(() => {});
  const togglePlay = ref(() => {});
  const isPlaying = ref(false);
  const interactionMethod = ref<UniverseInteractionMethod>("draw");

  const getCoordinates = ({ clientX, clientY }: MouseEvent) => {
    const clientRect = canvasElement.value?.getBoundingClientRect();

    return {
      x: clientX - (clientRect?.left ?? 0),
      y: clientY - (clientRect?.top ?? 0),
    };
  };

  let interact = (_event: MouseEvent) => {};

  let isDrawing = false;

  const onClick = (event: MouseEvent) => interact(event);
  const onMouseDown = (event: MouseEvent) => {
    isDrawing = true;
    interact(event);
  };
  const onTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    isDrawing = true;
    interact(new MouseEvent("mousemove", event.touches[0]));
  };
  const onMouseMove = (event: MouseEvent) => {
    if (isDrawing) interact(event);
  };
  const onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    if (isDrawing) interact(new MouseEvent("mousemove", event.touches[0]));
  };
  const onMouseUp = () => (isDrawing = false);
  const onTouchEnd = () => (isDrawing = false);

  const removeAllEventListeners = () => {
    canvasElement.value?.removeEventListener("click", onClick);
    canvasElement.value?.removeEventListener("mousedown", onMouseDown);
    canvasElement.value?.removeEventListener("mousemove", onMouseMove);
    canvasElement.value?.removeEventListener("mouseup", onMouseUp);
    canvasElement.value?.removeEventListener("touchstart", onTouchStart);
    canvasElement.value?.removeEventListener("touchmove", onTouchMove);
    canvasElement.value?.removeEventListener("touchend", onTouchEnd);
  };

  onMounted(async () => {
    const { Universe } = await import("~/wasm/universe/pkg");

    if (canvasElement.value) {
      const universe = new Universe(
        canvasElement.value,
        canvasWidth.value,
        canvasHeight.value,
        cellSize.value,
        "#00000040",
        "#CBFAF0"
      );

      watchEffect(() =>
        universe.setSize(canvasWidth.value, canvasHeight.value)
      );

      watchEffect(() => universe.setCellSize(cellSize.value));

      reset.value = () => universe.killAllCells();

      let animationId: number | null = null;

      togglePlay.value = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
          isPlaying.value = false;
        } else {
          const render = () => {
            universe.tick();
            animationId = requestAnimationFrame(render);
          };

          isPlaying.value = true;
          animationId = requestAnimationFrame(render);
        }
      };

      watchEffect(() => {
        removeAllEventListeners();

        if (interactionMethod.value === "toggle") {
          interact = (event: MouseEvent) => {
            const { x, y } = getCoordinates(event);

            universe.toggleCellAt(x, y);
          };

          canvasElement.value?.addEventListener("click", onClick);
        } else {
          if (interactionMethod.value === "draw") {
            interact = (event: MouseEvent) => {
              const { x, y } = getCoordinates(event);

              universe.reviveCellAt(x, y);
            };
          } else {
            interact = (event: MouseEvent) => {
              const { x, y } = getCoordinates(event);

              universe.killCellAt(x, y);
            };
          }

          canvasElement.value?.addEventListener("mousedown", onMouseDown);
          canvasElement.value?.addEventListener("mousemove", onMouseMove);
          canvasElement.value?.addEventListener("mouseup", onMouseUp);
          canvasElement.value?.addEventListener("touchstart", onTouchStart);
          canvasElement.value?.addEventListener("touchmove", onTouchMove);
          canvasElement.value?.addEventListener("touchend", onTouchEnd);
        }
      });
    }
  });

  onBeforeUnmount(() => removeAllEventListeners());

  return {
    canvasElement,
    canvasWidth,
    canvasHeight,
    cellSize,
    reset,
    togglePlay,
    isPlaying,
    interactionMethod,
  };
};

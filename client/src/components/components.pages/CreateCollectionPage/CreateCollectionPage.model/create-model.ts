import { atom } from "@/shared/atom";
import { createApi, createEvent, createStore, sample } from "effector";
import { createCollectionFx } from "../CreateCollectionPage.api";

export const collectionModel = atom(() => {
  const pageStarted = createEvent();

  const $isNotify = createStore<boolean>(false);
  const $notifyMessage = createStore<string>("");

  const $mode = createStore<"create" | "edit">("create");
  const { setFormMode } = createApi($mode, {
    setFormMode: (_, mode: "create" | "edit") => mode,
  });

  $isNotify.on(createCollectionFx.doneData, () => true);
  $isNotify.on(createCollectionFx.fail, () => true);

  sample({
    clock: createCollectionFx.doneData,
    fn: () => "Подборка успешно создана!",
    target: $notifyMessage,
  });

  sample({
    clock: createCollectionFx.fail,
    fn: () => "Ошибка при создании подборки!",
    target: $notifyMessage,
  });

  return {
    pageStarted,
    $isNotify,
    $mode,
    $notifyMessage,
    createCollectionFx,
    setFormMode,
  };
});

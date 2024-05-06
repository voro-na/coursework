import { atom } from "@/shared/atom";
import { ICollectionDetails } from "@/types/collection";
import { createApi, createEvent, createStore, restore, sample } from "effector";
import { updateCollectionFx } from "../EditCollectionPage.api";

export const collectionModel = atom(() => {
  const pageStarted = createEvent<ICollectionDetails>();

  const $collection = restore(pageStarted, {
    title: "",
    description: "",
    author: "me",
    cards: [],
    _id: "",
  });

  const $isNotify = createStore<boolean>(false);
  const $notifyMessage = createStore<string>("");

  const $mode = createStore<"create" | "edit">("create");
  const { setFormMode } = createApi($mode, {
    setFormMode: (_, mode: "create" | "edit") => mode,
  });

  $isNotify.on(updateCollectionFx.doneData, () => true);
  $isNotify.on(updateCollectionFx.fail, () => true);

  sample({
    clock: updateCollectionFx.doneData,
    fn: () => "Подборка успешно отредактирована!",
    target: $notifyMessage,
  });

  sample({
    clock: updateCollectionFx.fail,
    fn: () => "Ошибка при редактировании подборки!",
    target: $notifyMessage,
  });

  return {
    pageStarted,
    $isNotify,
    $mode,
    $notifyMessage,
    setFormMode,
    $collection,
    updateCollectionFx,
  };
});

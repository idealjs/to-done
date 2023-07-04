import { useCallback } from "react";
import { proxy, useSnapshot } from "valtio";

const state = proxy<{
  selectedDate: Date;
}>({
  selectedDate: new Date(new Date().toDateString()),
});

export const useSelectedDate = () => {
  return useSnapshot(state).selectedDate;
};

export const useSetSelectedDate = () => {
  return useCallback((date: Date) => {
    state.selectedDate = date;
  }, []);
};

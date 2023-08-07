import { useMutation, useQuery } from "@tanstack/react-query";

import { useAxios, useNotification, useQueryContext } from "../providers/hooks";

export function useEvents() {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["events"],
    queryFn: () => protectedAxios.get("/event"),
  });
}

export function useCreateEvent() {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries(["events"]);
      return { newEvent };
    },
    onError: (_, __, context) => {
      console.log("Failed to create new event", context.newEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      showNotification({
        title: "Success",
        description: "Created new event!",
        type: "success",
      });
    },
    mutationFn: (newEvent) => protectedAxios.post("/event", newEvent),
  });
}

export function useUpdateEvent(id) {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async (updatedEvent) => {
      await queryClient.cancelQueries(["events"]);
      return { updatedEvent };
    },
    onError: (_, __, context) => {
      console.log("Failed to update event", context.updatedEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      showNotification({
        title: "Success",
        description: "Updated event!",
        type: "success",
      });
    },
    mutationFn: (updatedEvent) =>
      protectedAxios.put(`/event/${id}`, updatedEvent),
  });
}

export function useDeleteEvent(id) {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(["events"]);
    },
    onError: (_, __, context) => {
      console.log("Failed to delete event");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      showNotification({
        title: "Success",
        description: "Deleted event!",
        type: "success",
      });
    },
    mutationFn: () =>
      protectedAxios.delete(`/event/${id}`, { data: { id: id } }),
  });
}

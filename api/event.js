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
      console.log("Failed to create new post", context.newPost);
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

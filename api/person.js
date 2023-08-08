import { useMutation, useQuery } from "@tanstack/react-query";

import { useAxios, useNotification, useQueryContext } from "../providers/hooks";

export function usePersons(search = "") {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["persons"],
    queryFn: () => protectedAxios.get(`/person/${search}`),
  });
}

export function useCreatePerson() {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async (newPerson) => {
      await queryClient.cancelQueries(["persons"]);
      return { newPerson };
    },
    onError: (_, __, context) => {
      console.log("Failed to create new person", context.newPerson);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["persons"]);
      showNotification({
        title: "Success",
        description: "Created new person!",
        type: "success",
      });
    },
    mutationFn: (newPerson) => protectedAxios.post("/person", newPerson),
  });
}

export function useUpdatePerson(id) {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async (updatedPerson) => {
      await queryClient.cancelQueries(["persons"]);
      return { updatedPerson };
    },
    onError: (_, __, context) => {
      console.log("Failed to update person", context.updatedPerson);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["persons"]);
      showNotification({
        title: "Success",
        description: "Updated person!",
        type: "success",
      });
    },
    mutationFn: (updatedPerson) =>
      protectedAxios.put(`/person/${id}`, { ...updatedPerson, id: id }),
  });
}

export function useDeletePerson(id) {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(["persons"]);
    },
    onError: () => {
      console.log("Failed to delete person");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["persons"]);
      showNotification({
        title: "Success",
        description: "Deleted person!",
        type: "success",
      });
    },
    mutationFn: () =>
      protectedAxios.delete(`/person/${id}`, { data: { id: id } }),
  });
}

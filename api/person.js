import { useMutation, useQuery } from "@tanstack/react-query";

import { useAxios, useNotification, useQueryContext } from "../providers/hooks";

export function usePersons(search = "") {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["persons"],
    queryFn: () => protectedAxios.get(`/person/list/${search}`),
  });
}

export function useUsers(search = "") {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["persons", "users"],
    queryFn: () => protectedAxios.get(`/person/user/${search}`),
  });
}

export function useUser(userId) {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["persons", "users", userId],
    queryFn: () => protectedAxios.get(`auth/${userId}`),
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

export function useAddFriend(id) {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async (friendId) => {
      await queryClient.cancelQueries(["persons"]);
      return { friendId };
    },
    onError: (_, __, context) => {
      console.log("Failed to add as friend", context.friendId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["persons"]);
      showNotification({
        title: "Success",
        description: "Added as friend!",
        type: "success",
      });
    },
    mutationFn: () => protectedAxios.post("/person/friend", { id }),
  });
}

export function useRemoveFriend(id) {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async (friendId) => {
      await queryClient.cancelQueries(["persons"]);
      return { friendId };
    },
    onError: (_, __, context) => {
      console.log("Failed to remove friend", context.friendId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["persons"]);
      showNotification({
        title: "Success",
        description: "Removed friend!",
        type: "success",
      });
    },
    mutationFn: () =>
      protectedAxios.delete(`/person/friend/${id}`, { data: { id } }),
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
    mutationFn: () => protectedAxios.delete(`/person/${id}`, { data: { id } }),
  });
}

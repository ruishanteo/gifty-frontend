import { useMutation, useQuery } from "@tanstack/react-query";

import { useAxios, useNotification, useQueryContext } from "../providers/hooks";

export function useListings(params) {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["listings"],
    queryFn: () => protectedAxios.get("/listing", { params }),
  });
}

export function useListing(id) {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["listings", "listing"],
    queryFn: () => protectedAxios.get(`/listing/${id}`),
  });
}

export function useSavedListings(search = "") {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["listings", "saved"],
    queryFn: () => {
      return protectedAxios.get(`/listing/saved/${search}`);
    },
  });
}

export function useGiftedListings(search = "") {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["listings", "gifted"],
    queryFn: () => {
      return protectedAxios.get(`/listing/gifted/${search}`);
    },
  });
}

export function useWishlistedListings(personId, search = "") {
  const { protectedAxios } = useAxios();

  return useQuery({
    queryKey: ["listings", "gifted"],
    queryFn: () => {
      return protectedAxios.get(`/listing/wishlisted/${personId}/${search}`);
    },
  });
}

export function useGiftListing() {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(["listings"]);
    },
    onError: () => {
      console.log("Failed to gift listing");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
      showNotification({
        title: "Success",
        description: "Gifted listing!",
        type: "success",
      });
    },
    mutationFn: (id) => protectedAxios.put(`/giftedListing/${id}/gift`, { id }),
  });
}

export function useUngiftListing() {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(["listings"]);
    },
    onError: () => {
      console.log("Failed to ungift listing");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
      showNotification({
        title: "Success",
        description: "Ungifted listing!",
        type: "success",
      });
    },
    mutationFn: (id) =>
      protectedAxios.put(`/giftedListing/${id}/ungift`, { id }),
  });
}

export function useSaveListing() {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(["listings"]);
    },
    onError: () => {
      console.log("Failed to save listing");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
      showNotification({
        title: "Success",
        description: "Saved listing!",
        type: "success",
      });
    },
    mutationFn: (id) => protectedAxios.put(`/savedListing/${id}/save`, { id }),
  });
}

export function useUnsaveListing() {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(["listings"]);
    },
    onError: () => {
      console.log("Failed to unsave listing");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
      showNotification({
        title: "Success",
        description: "Unsaved listing!",
        type: "success",
      });
    },
    mutationFn: (id) =>
      protectedAxios.put(`/savedListing/${id}/unsave`, { id }),
  });
}

export function useWishListing() {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(["listings"]);
    },
    onError: () => {
      console.log("Failed to wish listing");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
      showNotification({
        title: "Success",
        description: "Wished listing!",
        type: "success",
      });
    },
    mutationFn: (params) =>
      protectedAxios.put(`/wishlistedListing/${params.id}/wish`, params),
  });
}

export function useUnwishListing() {
  const { protectedAxios } = useAxios();
  const { showNotification } = useNotification();
  const { queryClient } = useQueryContext();

  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(["listings"]);
    },
    onError: () => {
      console.log("Failed to unwish listing");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
      showNotification({
        title: "Success",
        description: "Unwished listing!",
        type: "success",
      });
    },
    mutationFn: (params) =>
      protectedAxios.put(`/wishlistedListing/${params.id}/unwish`, params),
  });
}

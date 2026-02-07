import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Article {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  category: { id: number; name: string };
}

interface CreateArticleData {
  categoryId: number;
  title: string;
  content: string;
  imageUrl?: string;
}

export function useArticles(categoryId?: number) {
  return useQuery<Article[]>({
    queryKey: ["articles", categoryId],
    queryFn: async () => {
      const url = categoryId ? `/api/articles?categoryId=${categoryId}` : "/api/articles";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal memuat artikel");
      return res.json();
    },
  });
}

export function useArticle(id: number) {
  return useQuery<Article>({
    queryKey: ["articles", "detail", id],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${id}`);
      if (!res.ok) throw new Error("Gagal memuat artikel");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateArticleData) => {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["articles"] }),
  });
}

export function useUpdateArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: CreateArticleData & { id: number }) => {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["articles"] }),
  });
}

export function useDeleteArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["articles"] }),
  });
}

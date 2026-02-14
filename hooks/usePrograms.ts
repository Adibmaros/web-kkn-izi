import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ProgramCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  title: string | null;
  bannerUrl: string | null;
  backgroundUrl: string | null;
}

interface Program {
  id: number;
  categoryId: number;
  slug: string;
  title: string;
  titleDescription: string | null;
  content: string;
  imageUrl: string;
  raised: number;
  goal: number;
  minimalAmount: number;
  endDate: string;
  programOrder: number | null;
  distributionUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: ProgramCategory;
}

interface CreateProgramData {
  categoryId: number;
  slug: string;
  title: string;
  titleDescription?: string;
  content: string;
  imageUrl: string;
  goal: number;
  minimalAmount: number;
  endDate: string;
  programOrder?: number;
  distributionUrl?: string;
  isActive?: boolean;
}

interface UpdateProgramData extends Partial<CreateProgramData> {
  raised?: number;
}

// Get all programs with optional category filter
export function usePrograms(categorySlug?: string, isActive?: boolean) {
  return useQuery<Program[]>({
    queryKey: ["programs", categorySlug, isActive],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categorySlug) params.append("category", categorySlug);
      if (isActive !== undefined) params.append("isActive", String(isActive));

      const url = `/api/programs${params.toString() ? `?${params}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal memuat program");
      return res.json();
    },
  });
}

// Get program by ID or slug
export function useProgram(idOrSlug: string | number) {
  return useQuery<Program>({
    queryKey: ["programs", "detail", idOrSlug],
    queryFn: async () => {
      const res = await fetch(`/api/programs/${idOrSlug}`);
      if (!res.ok) throw new Error("Gagal memuat program");
      return res.json();
    },
    enabled: !!idOrSlug,
  });
}

// Create new program
export function useCreateProgram() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateProgramData) => {
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal membuat program");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}

// Update program
export function useUpdateProgram(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateProgramData) => {
      const res = await fetch(`/api/programs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal mengupdate program");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["programs"] });
      qc.invalidateQueries({ queryKey: ["programs", "detail", id] });
    },
  });
}

// Delete program
export function useDeleteProgram() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/programs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus program");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}

// Get all program categories
export function useProgramCategories() {
  return useQuery<ProgramCategory[]>({
    queryKey: ["program-categories"],
    queryFn: async () => {
      const res = await fetch("/api/program-categories");
      if (!res.ok) throw new Error("Gagal memuat kategori program");
      return res.json();
    },
  });
}

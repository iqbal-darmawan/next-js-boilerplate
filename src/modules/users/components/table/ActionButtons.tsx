// components/ActionButtons.tsx

import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { UserType } from "../../types/UserType";

interface ActionButtonsProps {
  data: UserType; // Menerima data pengguna sebagai props
}

export const ActionButtons = ({ data }: ActionButtonsProps) => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    // Arahkan ke halaman detail user
    router.push(`/users/${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log("🚀 ~ handleDelete ~ id:", id)
    try {
      // Panggil API untuk menghapus pengguna
      // await deleteUser({ id });

      // Setelah berhasil menghapus, tampilkan notifikasi
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div className="flex space-x-2">
      {/* Tombol Edit */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleEdit(data.id)} // Menggunakan data yang diterima
      >
        Edit
      </Button>

      {/* Tombol Delete */}
      <Button
        variant="outline"
        size="sm"
        color="destructive"
        onClick={() => handleDelete(data.id)} // Menggunakan data yang diterima
      >
        Delete
      </Button>
    </div>
  );
};

export default ActionButtons;

"use client";

import { DataTable } from "@/modules/users/components/table/data-table";
import { useGetAllUsersQuery } from "../../services/api/userSlice";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export default function UsersListTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("createdAt"); // Default sorting column
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch data dengan parameter search, sorting, dan pagination
  const { data, isLoading } = useGetAllUsersQuery({
    page,
    limit,
    search,
    orderBy,
    asc: sortDirection === "asc",
  });

  const [totalPages, setTotalPages] = useState(1);

  // Perbarui total halaman saat data berubah
  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  // Fungsi untuk berpindah halaman
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Fungsi untuk mengubah limit
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1); // Reset ke halaman pertama
  };

  // Fungsi untuk mengubah nilai pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset ke halaman pertama saat search berubah
  };

  // Fungsi untuk menangani sorting
  const handleSort = (column: string) => {
    if (orderBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container mx-auto w-full">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center mb-5">
          <h5 className="text-2xl font-bold text-gray-900">List Users</h5>
          <h5 className="text-lg font-semibold text-gray-900">
            Total Users: {data?.totalCount}
          </h5>
        </div>
        <Button asChild>
          <Link href="users/create">Add User</Link>
        </Button>
      </div>
      {/* Search & Pagination Controls */}
      <div className="flex justify-between items-center py-2">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-1"
          value={search}
          onChange={handleSearchChange}
        />

        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium">Rows per page:</label>
          <select
            className="border rounded px-2 py-1"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : data && data.data ? (
        <DataTable
          columns={columns}
          data={data.data}
          pageCount={totalPages}
          currentPage={page}
          pageSize={limit}
          onPageChange={handlePageChange}
          orderBy={orderBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

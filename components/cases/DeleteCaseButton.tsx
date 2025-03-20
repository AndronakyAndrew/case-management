"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface DeleteCaseButtonProps {
  caseId: string;
  onDelete?: () => void;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export default function DeleteCaseButton({ caseId, onDelete }: DeleteCaseButtonProps) {
  const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить дело?")) {
      const authToken = getCookie("authToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cases/delete/${caseId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: "DELETE",
      });
      if (res.ok) {
        onDelete && onDelete();
      } else {
        alert("Ошибка при удалении дела.");
      }
    }
  };

  return (
    <Button onClick={handleDelete} variant="destructive" size="sm">
      Удалить дело
    </Button>
  );
}
"use client";
className?: string }) {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className={className ?? "gap-2"} variant="ghost">
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}

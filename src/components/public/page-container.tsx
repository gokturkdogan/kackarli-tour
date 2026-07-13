import { cn } from "@/lib/utils";

export function pageContainerClass(className?: string) {
  return cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className);
}

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={pageContainerClass(className)}>{children}</div>;
}

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { QuizModal } from "./QuizModal";

export default function PaginationFooter() {
  return (
    <Pagination className="lg:bottom-0 lg:fixed lg:h-[60px]">
      <PaginationContent className="lg:flex lg:gap-[1000px]">
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

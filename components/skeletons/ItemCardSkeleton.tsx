import { Skeleton } from "@/components/ui/skeleton"

export function ItemCardSkeleton() {
  return (
      <div className="bg-white rounded-xl flex flex-row justify-between gap-5 pr-4 pl-0 lg:pr-20 lg:pl-12 py-4 drop-shadow-sm w-full max-w-[1000px]">
        <Skeleton className="sm:hidden w-[150px] h-[150px] object-contain" />

        <div className="flex sm:flex-row flex-col justify-center sm:justify-between sm:items-center items-start sm:gap-4 gap-8 w-full">
          <div className="flex sm:flex-row gap-8 sm:items-center">
            <Skeleton className="max-sm:hidden w-[150px] h-[150px] object-cover" />

            <div className="flex flex-col justify-center gap-3">
              <Skeleton className="h-6 w-48" />
              <ul className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:gap-2 gap-4 justify-center sm:items-end items-start">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-32 rounded-2xl" />
          </div>
        </div>
      </div>
  )
}
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-1 h-full p-10">
        <div className="w-2/3 space-y-8">
          <div className="flex flex-col lg:flex-row">
            <Skeleton className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[800px]" />
            <div className="flex mt-5 lg:mt-0 flex-col gap-4 w-full px-2 lg:px-10">
              <Skeleton className="w-full h-[40px]" />
              <Separator orientation="horizontal" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-[120px] h-[25px]" />
                <Separator orientation="vertical" />
                <Skeleton className="w-[120px] h-[25px]" />
              </div>
              <Skeleton className="w-[200px] h-[25px]" />
              <Skeleton className="w-[200px] h-[25px]" />
              <Skeleton className="w-[200px] h-[25px]" />
              <Skeleton className="w-full h-[250px]" />
            </div>
          </div>
          <Separator orientation="horizontal" />
          <div className="px-5 flex flex-col gap-4">
            <div>
              <Skeleton className="w-full" />
              <Skeleton className="h-[100px] w-full" />
            </div>
            <Skeleton className="w-[140px] h-[50px]" />
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/3 flex flex-col gap-4">
          <Skeleton className="h-[50px] w-full" />
          <Skeleton className="h-[25px] w-[150px]" />
          <Skeleton className="h-[25px] w-[150px]" />
          <Skeleton className="h-[25px] w-[150px]" />
          <Skeleton className="h-[25px] w-[150px]" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

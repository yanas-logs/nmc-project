import { Button } from "@/components/ui/button";
import { HeartAngleIcon } from "@/utils/icons";
import Image from "next/image";

interface PropeTypes {
  thumbnailImage: string;
}

export default function PurchaseCard({ thumbnailImage }: PropeTypes) {
  return (
    <div className="lg:absolute lg:w-[350px] lg:p-0.5 lg:bg-white lg:shadow-lg top-0 right-0 lg:translate-x-[110%] ">
      <div className="relative h-48 w-full ">
        <Image src={thumbnailImage} alt="image" fill objectFit="cover" />
      </div>
      <div className="p-2">
        <h1 className="text-xl font-extrabold mb-2">
          <span>$</span>3423
        </h1>
        <div className="flex gap-2">
          <Button className="flex-1">Add To Cart</Button>
          <Button variant="outline">
            <HeartAngleIcon />
          </Button>
        </div>
        <p className="text-center text-sm text-gray-500 my-3">
          Full life time access.
        </p>
      </div>
    </div>
  );
}

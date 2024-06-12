import AvatarList from "../AvatarList";
import { Button } from "@/components/ui/button";

interface ManualCustomerSelectionBoxProps {
    segment_id: string;
}

export default function ManualCustomerSelectionBox({ segment_id }: ManualCustomerSelectionBoxProps) {

    console.log("segment_id", segment_id);

    return (
        <div className="flex flex-col border-2 border-dashed rounded-2xl w-full h-min p-8 items-center gap-2">
            <AvatarList segmentId={segment_id}/>
            <Button size="sm" className="w-min text-popover-foreground" variant="ghost"><span className="material-icons">add</span>Add Customers</Button>
        </div>
    );
}
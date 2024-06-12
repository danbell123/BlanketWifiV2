import React from "react";
import { Segment } from "@/types";
import { Button } from "@/components/ui/button";
import { updateSegment } from "@/services/segmentsService";

export default function testPage() {

    const segment: Segment = {
        segment_id: "1",
        name: "Test Segment",
        description: "This is a test segment",
        created_at: new Date(),
        updated_at: new Date(),
    }

    const handleClick = () => {
        console.log("Button clicked");
        console.log("Updating segment:", segment);
    }

    return (
        <div>
        <h1>Test Page</h1>
        <Button onClick={handleClick}>Click me</Button>
        </div>
    );
}

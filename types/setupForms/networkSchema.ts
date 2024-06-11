import { set } from "date-fns";
import { z } from "zod";

const networkSchema = z.object({
    setupType: z.enum(["existing", "new"], { message: "Invalid setup type" }),
});

export default networkSchema;

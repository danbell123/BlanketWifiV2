import { z } from 'zod';

const registrationSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
    passwordCheck: z.string(),
}).refine(data => data.password === data.passwordCheck, {
    message: "Passwords must match.",
    path: ["passwordCheck"], // This shows the error on the passwordCheck field
});

export default registrationSchema;
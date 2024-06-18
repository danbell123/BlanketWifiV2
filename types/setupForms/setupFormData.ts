import { z } from 'zod';
import yourDetailsSchema from './yourDetailsSchema';
import businessDetailsSchema from './businessDetailsSchema';
import plansSchema from './plansSchema';
import networkSchema from './networkSchema';

interface SetupFormData {
    details: z.infer<typeof yourDetailsSchema>;
    businessDetails: z.infer<typeof businessDetailsSchema>;
    planDetails: z.infer<typeof plansSchema>;
    networkDetails: z.infer<typeof networkSchema>;
  }

export default SetupFormData;
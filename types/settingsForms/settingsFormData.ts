import { z } from 'zod';
import yourDetailsSchema from '../setupForms/yourDetailsSchema';
import businessDetailsSchema from '../setupForms/businessDetailsSchema';
import plansSchema from '../setupForms/plansSchema';
import networkSchema from '../setupForms/networkSchema';

interface SettingsFormData {
    details: z.infer<typeof yourDetailsSchema>;
    businessDetails: z.infer<typeof businessDetailsSchema>;
    planDetails: z.infer<typeof plansSchema>;
    networkDetails: z.infer<typeof networkSchema>;
  }

export default SettingsFormData;
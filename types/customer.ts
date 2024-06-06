export type Customer = {
    customerID: string;
    firstname: string;
    lastname: string;
    email: string;
    tel: string;
    profilePicture: string;
    dob: Date;
    gender: 'male' | 'female' | 'other' | 'prefer not to say';
    createdAt: Date;
  };
  
export default class UserModel {
  id?: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  address!: Address;
  password!: string;
  phone!: string;
  birthDate!: string;
}

export interface Address {
  street_name: string;
  suite_number: string;
  pincode: string;

  state: string;
  country: string;
  // postalCode:string;
}

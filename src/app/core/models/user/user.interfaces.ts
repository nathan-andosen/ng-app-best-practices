export interface IUserAddress {
  street?: string;
  postcode?: string;
}

export interface IUserPet {
  type: string;
  name: string;
}

export interface IUserData {
  name: string;
  age?: string;
  pets?: IUserPet[];
  other?: { height: number; };
  address?: IUserAddress;
}

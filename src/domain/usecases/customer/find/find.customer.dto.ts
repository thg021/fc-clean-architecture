
export interface FindCustomerDTOInput {
  id: string
}

export interface FindCustormeDTOOutput {
  id: string;
  name: string;
  //active: boolean;
  address: {
    street: string;
    number: number;
    zip:  string;
    city: string;
  }
}
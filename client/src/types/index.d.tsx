export interface User {
    id: number,
    email: string;
    status: string;
    firstName: string;
    lastName: string;
    phoneNumber: string,
    address: string,
    country: string,
    postalCode: string,
    photoProfile: string;
    displayFullName: boolean; 
}

export interface Category {
    id: number,
    name: string,
    slug: string,
}
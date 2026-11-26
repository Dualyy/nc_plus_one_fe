export interface User{
    id?: number;
    name: string;
    email: string;
    password?: string;
}

export interface Attendees{
    attendees: User[]
}

export interface Token{
   token:string;
   type:string 
}
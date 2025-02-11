import { Timestamp } from "firebase/firestore"

declare global {
    type Vendors={
        id:string,
        name:string,
        email:string,
        phone:string,
        plan:'monthly' | '3months' | 'yearly'
        address?:string,
        locality:string,
        dateOfJoining:Timestamp,
        dateOfLastRenewal:Timestamp
    }
    type Fisherman={
        id:string,
        name:string,
        vendorsId:string,
        dateOfJoining:Timestamp,
        phone:string,
        email?:string,
        isActive:boolean
    }
}
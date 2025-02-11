declare global {
    type Vendors={
        name:string,
        email:string,
        phone:string,
        plan:'monthly' | '3months' | 'yearly'
        address?:string,
        locality:string
    }
}
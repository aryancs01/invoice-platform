interface iAppProps {
    amount:number;
    currency:"USD" | "EUR" 
}
export function formatCurrency({amount,currency}:iAppProps){
    return new Intl.NumberFormat("en-us",{
        style:"currency",
        currency:currency,
    }).format(amount)
}
import { prisma } from "@/app/utils/db"
import { requireUser } from "@/app/utils/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"
import WarningGif from "@/public/warning-gif.gif"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { SubmitButton } from "@/app/components/SubmitButton"
import { DeleteInvoice } from "@/app/actions"

async function Authorize(invoiceId:string,userId:string){
    const data = await prisma.invoice.findUnique({
        where:{
            id:invoiceId,
            userId:userId
        }
    })

    if(!data){
        return redirect("/dashboard/invoices")
    }
}

type Params = Promise<{invoiceId:string}>

export default async function DeleteInvoiceRoute({params}:{params:Params}){
    const {invoiceId} = await params
    const session = await requireUser();
    await Authorize(invoiceId,session.user?.id as string)

    return (
        <div className="flex flex-1 justify-center items-center ">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Delete Invoice</CardTitle>
                    <CardDescription>
                        Are you sure that you want to delete this invoice?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={WarningGif}
                        alt="Warning GIF"
                        className="rounded-lg"
                        quality={100}
                    />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Link className={buttonVariants({
                        variant:"outline"
                    })} href={"/dashboard/invoices"}>Cancel</Link>
                    <form action={async ()=>{
                        "use server"
                        await DeleteInvoice(invoiceId)
                    }}>
                        <SubmitButton variant={"destructive"} text="Delete Invoice"/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
} 
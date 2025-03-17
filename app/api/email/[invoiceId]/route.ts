import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

type Params = Promise<{ invoiceId: string }>

export async function POST(req: Request, { params }: { params: Params }) {
    try {
        const session = await requireUser();
        const { invoiceId } = await params
        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session.user?.id
            },
        });

        if (!invoiceData) {
            return NextResponse.json({
                error: "Invoice not found"
            }, { status: 404 })
        }

        const sender = {
            email: "hello@demomailtrap.co",
            name: "Invoice Platfrom",
        };

        emailClient.send({
            from: sender,
            to: [{ email: "aryan1032saxena@gmail.com" }],
            template_uuid: "cfbbe16b-a1ea-4c81-be93-6c4ed2b5ac94",
            template_variables: {
                "first_name": "Aryan",
                "company_info_name": "Invoice Generate",
                "company_info_city": "Jaipur",
                "company_info_country": "India"
            }
        })

        return NextResponse.json({
            success: true
        })
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to send Email reminder'
        }, { status: 500 })
    }
}
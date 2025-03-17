import { prisma } from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { requireUser } from "@/app/utils/hooks";
import { sendReminderEmail, transport } from "@/app/utils/sendEmails";
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

        await sendReminderEmail({
            to:invoiceData.clientEmail,
            clientName:invoiceData.clientName,
            invoiceNumber:invoiceData.invoiceNumber,
            dueDate:invoiceData.dueDate.toString(),
            totalAmount:formatCurrency({
                amount:invoiceData.total,
                currency:invoiceData.currency as any
            })
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
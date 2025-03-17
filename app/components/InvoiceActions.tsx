"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CheckCheck, DownloadCloud, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface iAppProps {
    id: string;
    status: string;
}
export default function InvoiceActions({ id, status }: iAppProps) {

    const handleSendReminder = async () => {
        toast.promise(fetch(`/api/email/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        }), {
            loading: "Sending reminder email ..",
            success: "Reminder email sent successfully",
            error: "Failed to send reminder email"
        }
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant={"secondary"}>
                    <MoreHorizontal className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="bg-white hover:bg-secondary">
                    <Link href={`/dashboard/invoices/${id}`} className="flex  gap-2 px-3 py-2 items-center justify-start">
                        <Pencil className="size-4 mr-2" />
                        Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-white hover:bg-secondary">
                    <Link href={`/api/invoice/${id}`} target="_blank" className="flex  gap-2 px-3 py-2 items-center justify-start">
                        <DownloadCloud className="size-4 mr-2" />
                        Downlord Invoice
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleSendReminder} className="bg-white hover:bg-secondary flex  gap-2 px-3 py-2 items-center justify-start cursor-pointer">
                    <Mail className="size-4 mr-2" />
                    Reminder Email
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-white hover:bg-secondary">
                    <Link href={`/dashboard/invoices/${id}/delete`} className="flex text-red-500  gap-2 px-3 py-2 items-center justify-start">
                        <Trash className="size-4 mr-2" />
                        Delete Invoice
                    </Link>
                </DropdownMenuItem>
                {(status !== "PAID") &&
                    <DropdownMenuItem className="bg-white hover:bg-secondary">
                        <Link href={`/dashboard/invoices/${id}/paid`} className="flex  gap-2 px-3 py-2 items-center justify-start">
                            <CheckCheck className="size-4 mr-2" />
                            Mark as Paid
                        </Link>
                    </DropdownMenuItem>
                }

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
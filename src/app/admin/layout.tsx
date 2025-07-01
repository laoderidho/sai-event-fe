import AdminNavigation from "@/components/custom/navigation/AdminNavigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}){
    return (
        <>
            <AdminNavigation/>
            {children}
        </>
    )
}
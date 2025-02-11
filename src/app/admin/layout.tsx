import AdminSidebar from "@/shared/components/sidebar/admin-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main>
          <SidebarTrigger />
          <div className="p-10 min-w-[calc(100svw-var(--sidebar-width))]">
            {children}
          </div>
        </main>
      </SidebarProvider>
      {/* footer */}
    </>
  );
};

export default Layout;

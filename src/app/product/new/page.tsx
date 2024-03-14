import { getServerAuthSession } from "@/server/auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductForm from "./product-form";

export default async function NewProductPage() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar session={session} />
      <main className="p-4 md:p-10">
        <ProductForm />
      </main>
      <Footer />
    </>
  );
}

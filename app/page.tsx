import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mele dev",
  description: "Sistema como template para proyectos de desarrollo",
}

export default async function Home() {
  return (
    <div>
      Hello
    </div>
  );
}

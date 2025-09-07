import type { Metadata } from "next";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog | ECOSSISTEMA 5ESTRELAS",
  description: "Posts oficiais do ECOSSISTEMA 5ESTRELAS",
};

export default function Page() {
  return <BlogList />;
}

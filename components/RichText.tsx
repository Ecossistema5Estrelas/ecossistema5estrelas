import { PortableText } from "@portabletext/react";

const components = {
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export default function RichText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}

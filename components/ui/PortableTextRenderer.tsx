import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { url: string }; alt?: string } }) => {
      if (!value?.asset?.url) return null;
      return (
        <div className="my-8 rounded-2xl overflow-hidden">
          <Image
            src={value.asset.url}
            alt={value.alt ?? ""}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}

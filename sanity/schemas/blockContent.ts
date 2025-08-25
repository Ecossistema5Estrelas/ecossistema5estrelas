// @ts-nocheck
import { defineType, defineArrayMember } from "sanity";

const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

export default blockContent;

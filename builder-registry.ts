"use client";
import { builder, Builder } from "@builder.io/react";
import Megamenu from "./components/Megamenu";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Megamenu, {
  name: "Megamenu",
  inputs: [
    {
      name: "className",
      type: "string",
    },
  ],
});

import { defineConfig } from "unocss"
import presetWind3 from "@unocss/preset-wind3"

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    colors: {
      background: "#ffffff", // clean white
      leaf: "#22c55e",       // modern green
      text: "#111827",       // dark gray for readability
    },
  },
  safelist: ["bg-leaf", "text-leaf", "hover:bg-leaf/90"],
})

import { NodeMeta } from "@/types";

export const mockNode: NodeMeta = {
  name: "Mock Atlas Tool",
  description:
    "A fake tool that mimics the Atlas detector. Just for UI testing.",
  inputs: [
    {
      name: "input_image",
      shortname: "i",
      help: "Input image path",
      required: true,
      type: "Path",
    },
    {
      name: "gaussian_std",
      shortname: "rad",
      help: "Standard deviation for Gaussian blur",
      default: 45,
      type: "int",
    },
    {
      name: "p_value",
      shortname: "pval",
      help: "Probability threshold",
      default: 0.01,
      decimals: 4,
      type: "float",
    },
    {
      name: "area_lim",
      shortname: "arealim",
      help: "Minimum area of detection",
      default: 0.5,
      decimals: 2,
      type: "float",
    },
    {
      name: "verbose",
      shortname: "v",
      help: "Enable verbose output",
      default: true,
      type: "bool",
    },
  ],
  outputs: [
    {
      name: "output_image",
      shortname: "o",
      help: "Resulting image path",
      default: "out.tif",
      type: "Path",
    },
  ],
};

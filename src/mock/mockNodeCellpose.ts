import { NodeMeta } from "@/types";

export const mockNodeCellpose: NodeMeta = {
  name: "Mock Cellpose",
  description: "Segment cells using a mock version of Cellpose for UI testing.",
  inputs: [
    {
      name: "input_image",
      shortname: "i",
      help: "The input image path.",
      required: true,
      type: "Path",
    },
    {
      name: "model_type",
      shortname: "m",
      help: "Model type: cyto, nuclei, cyto2, or cyto3.",
      default: "cyto",
      choices: ["cyto", "nuclei", "cyto2", "cyto3"],
      type: "str",
    },
    {
      name: "use_gpu",
      shortname: "g",
      help: "Enable GPU acceleration.",
      default: false,
      type: "bool",
    },
    {
      name: "auto_diameter",
      shortname: "a",
      help: "Automatically estimate cell diameters.",
      default: false,
      type: "bool",
    },
    {
      name: "diameter",
      shortname: "d",
      help: "Estimated diameter of cells (pixels).",
      default: 30,
      type: "int",
    },
    {
      name: "channels",
      shortname: "c",
      help: 'Channels for segmentation. Example: "[0,0]" for grayscale, "[2,3]" for G=cytoplasm/B=nucleus.',
      default: "[0,0]",
      type: "str",
    },
  ],
  outputs: [
    {
      name: "segmentation",
      shortname: "s",
      help: "Path to save the segmentation image.",
      default: "{input_image.stem}_segmentation.png",
      type: "Path",
    },
    {
      name: "visualization",
      shortname: "v",
      help: "Path to save the visual output as NumPy array.",
      default: "{input_image.stem}_visualization.npy",
      type: "Path",
    },
  ],
};

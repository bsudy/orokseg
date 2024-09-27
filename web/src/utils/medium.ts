import { MediumRef } from "../gql/graphql";

export const getCutout = (medium: MediumRef): Promise<string> => {
  return new Promise((resolve, reject) => {
    const rect = medium.rectangle;
    if (!rect) {
      resolve(medium.medium.contentUrl);
      return;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const sx = Math.min(rect.x1, rect.x2);
    const sy = Math.min(rect.y1, rect.y2);
    const width = Math.abs(rect.x2 - rect.x1);
    const height = Math.abs(rect.y2 - rect.y1);
    console.log("rect", rect);
    console.log("sx", sx, "sy", sy, "width", width, "height", height);

    var image = new Image();
    image.onload = () => {
      const w = image.width * (width / 100);
      const h = image.height * (height / 100);
      const x = image.width * (sx / 100);
      const y = image.height * (sy / 100);
      canvas.width = w;
      canvas.height = h;
      console.log("w", w, "h", h, "x", x, "y", y);
      ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
      resolve(canvas.toDataURL());
    };
    image.src = medium.medium.contentUrl;

    // THIS IS WRONG! It can be added only later. I think it's better to create a component.
  });
};

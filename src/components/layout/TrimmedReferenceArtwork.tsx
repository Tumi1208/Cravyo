import { Image, StyleSheet, View, type ImageSourcePropType } from "react-native";

type TrimmedReferenceArtworkProps = {
  backgroundColor: string;
  frameHeight: number;
  source: ImageSourcePropType;
  imageScale?: number;
  imageTranslateX?: number;
  imageTranslateY?: number;
  width: number;
};

function scaleSourcePixels(
  source: ImageSourcePropType,
  width: number,
  sourcePx: number,
) {
  const asset = Image.resolveAssetSource(source);

  if (!asset.width) {
    return Math.round((width / 500) * sourcePx);
  }

  return Math.round((width / asset.width) * sourcePx);
}

export function TrimmedReferenceArtwork({
  backgroundColor,
  frameHeight,
  source,
  imageScale = 1,
  imageTranslateX = 0,
  imageTranslateY = 0,
  width,
}: TrimmedReferenceArtworkProps) {
  const asset = Image.resolveAssetSource(source);
  const aspectRatio =
    asset.width && asset.height ? asset.height / asset.width : 1.3;
  const baseImageWidth = width;
  const baseImageHeight = Math.round(baseImageWidth * aspectRatio);
  const scaledImageWidth = Math.round(baseImageWidth * imageScale);
  const scaledImageHeight = Math.round(baseImageHeight * imageScale);
  const renderedTranslateX = scaleSourcePixels(source, width, imageTranslateX);
  const renderedTranslateY = scaleSourcePixels(source, width, imageTranslateY);
  const centeredLeft = Math.round((width - scaledImageWidth) / 2);

  return (
    <View style={[styles.frame, { backgroundColor, height: frameHeight }]}>
      <Image
        source={source}
        style={{
          position: "absolute",
          width: scaledImageWidth,
          height: scaledImageHeight,
          left: centeredLeft + renderedTranslateX,
          top: renderedTranslateY,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: "hidden",
  },
});

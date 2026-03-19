import { Image, StyleSheet, View, type ImageSourcePropType } from "react-native";

type TrimmedReferenceArtworkProps = {
  backgroundColor: string;
  frameHeight: number;
  source: ImageSourcePropType;
  topTrimSourcePx: number;
  width: number;
};

function getRenderedTopTrim(
  source: ImageSourcePropType,
  width: number,
  topTrimSourcePx: number,
) {
  const asset = Image.resolveAssetSource(source);

  if (!asset.width) {
    return Math.round(width * 0.14);
  }

  return Math.round((width / asset.width) * topTrimSourcePx);
}

export function TrimmedReferenceArtwork({
  backgroundColor,
  frameHeight,
  source,
  topTrimSourcePx,
  width,
}: TrimmedReferenceArtworkProps) {
  const renderedTopTrim = getRenderedTopTrim(source, width, topTrimSourcePx);

  return (
    <View style={[styles.frame, { backgroundColor, height: frameHeight }]}>
      <Image
        resizeMode="cover"
        source={source}
        style={{
          width,
          height: frameHeight + renderedTopTrim,
          marginTop: -renderedTopTrim,
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

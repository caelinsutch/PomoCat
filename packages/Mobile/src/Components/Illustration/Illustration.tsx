// @ts-ignore
import { Image } from "react-native";
import React from "react";
import LogoWhite from "../../../assets/LogoWhite.png";

const illustrations = {
  logoWhite: LogoWhite,
};

type IllustrationProps = {
  illustration: keyof typeof illustrations;
  width: number;
  height: number;
};

const Illustration: React.FC<IllustrationProps> = ({
  illustration,
  width,
  height,
}) => (
  <Image
    source={illustrations[illustration]}
    style={{
      width,
      height,
      resizeMode: "contain",
    }}
  />
);

export default Illustration;

import React from "react";

import { Text, Title } from "../../../../components";
import { DATA } from "../data";

const LoginText = () => (
  <div className="auth__formText">
    <Title variant="asr-24-1 u-display-block">{DATA.PRETEXT}</Title>
    <Title variant="osb-49-1 u-text-capitalize">{DATA.TITLE}</Title>
    <Text variant="ir-16-1 u-text-justify">{DATA.TEXT}</Text>
  </div>
);

export default LoginText;

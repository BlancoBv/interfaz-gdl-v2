import { View, Text } from "@react-pdf/renderer";

import { FC } from "react";

const EncabezadosEtiquetas: FC<{
  label: string;
  value: string | number | undefined;
}> = ({ label, value }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      {value && (
        <>
          <Text>{label}</Text>
          <Text>{value ? value : "---"}</Text>
        </>
      )}
    </View>
  );
};
export default EncabezadosEtiquetas;

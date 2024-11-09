import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface Props {
  revision?: number;
  retencion?: number;
  disposicion?: string;
}

const TablaRevision: FC<Props> = ({
  revision,
  retencion,
  disposicion,
}: Props) => {
  const styles = StyleSheet.create({
    dflex: {
      display: "flex",
      flexDirection: "row",
    },
    flexColumn: {
      flexDirection: "column",
    },
    justifyBetween: {
      justifyContent: "space-between",
    },
    justifyAround: {
      justifyContent: "space-around",
    },
    justifyEvenly: {
      justifyContent: "space-evenly",
    },
    justifyCenter: {
      justifyContent: "center",
    },
    alignCenter: {
      alignItems: "center",
    },
    textBold: {
      fontWeight: "bold",
    },
    textCenter: {
      textAlign: "center",
    },
    textSize: {
      fontSize: 8,
    },
  });

  return (
    <View
      style={{ border: "1px solid black", width: "100px", fontSize: "12px" }}
    >
      <View style={{ borderBottom: "1px solid black", ...styles.dflex }}>
        <View
          style={{
            backgroundColor: "#8db4e2",
            borderRight: "1px solid black",
            width: "50%",
            fontWeight: "bold",
          }}
        >
          <Text hyphenationCallback={(w) => [w]} style={styles.textSize}>
            Tiempo Retención
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#c5d9f1",
            width: "50%",
            ...styles.dflex,
            ...styles.justifyCenter,
            ...styles.alignCenter,
          }}
        >
          <Text style={styles.textSize}>{retencion || 1} año</Text>
        </View>
      </View>

      <View style={{ borderBottom: "1px solid black", ...styles.dflex }}>
        <View
          style={{
            backgroundColor: "#8db4e2",
            borderRight: "1px solid black",
            width: "50%",
            fontWeight: "bold",
          }}
        >
          <Text hyphenationCallback={(w) => [w]} style={styles.textSize}>
            Disposición
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#c5d9f1",
            width: "50%",
            ...styles.dflex,
            ...styles.justifyCenter,
            ...styles.alignCenter,
          }}
        >
          <Text style={styles.textSize}>{disposicion || "Destrucción"}</Text>
        </View>
      </View>

      <View style={{ ...styles.dflex }}>
        <View
          style={{
            backgroundColor: "#8db4e2",
            borderRight: "1px solid black",
            width: "50%",
            fontWeight: "bold",
          }}
        >
          <Text hyphenationCallback={(w) => [w]} style={styles.textSize}>
            Número de Revisión
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#c5d9f1",
            width: "50%",
            ...styles.dflex,
            ...styles.justifyCenter,
            ...styles.alignCenter,
          }}
        >
          <Text style={styles.textSize}>{revision || 1}</Text>
        </View>
      </View>
    </View>
  );
};

export default TablaRevision;

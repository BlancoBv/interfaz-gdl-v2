import { View, Text } from "@react-pdf/renderer";
import moment from "moment";
import { FC } from "react";

const DateAndPages: FC = () => {
  const date = new Date(Date.now());

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "center",
        marginHorizontal: "auto",
        position: "absolute",
        top: 10,
        left: 10,
      }}
      fixed
    >
      <Text>{`Impreso el ${moment(date).format(
        "DD MMMM YYYY, h:mm:ss a"
      )}`}</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Página ${pageNumber} de ${totalPages}.`
        }
      />
    </View>
  );
};
export default DateAndPages;

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { FC } from "react";
import HTML from "react-pdf-html";
import html2canvas from "html2canvas-pro";

interface elementos {
  tablas?: string[];
  graficas?: string[];
}

const PDFReportes: FC<{ elementos: elementos; title: string }> = ({
  elementos,
  title,
}) => {
  const styles = StyleSheet.create({
    page: {
      // flexDirection: "row",
      fontSize: "8pt",
      backgroundColor: "#fff",
      padding: "50px",
      width: "100%",
      position: "relative",
    },
    title: {
      textAlign: "center",
      borderBottom: "2px solid black",
      paddingBottom: "5px",
      //fontFamily: "calibriN",
      fontSize: "20pt",
    },
    legendTime: {
      //    marginBottom: 8,
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      alignItems: "center",
      marginHorizontal: "auto",
      position: "absolute",
      top: 10,
      left: 10,
    },
  });

  const chartToImage = async (id: string) => {
    const element = document.getElementById(id) as HTMLCanvasElement;
    console.log({ element });

    const img = html2canvas(element, {
      allowTaint: true,
      scale: 2,
      logging: false,
    }).then((canvas) => {
      const result = canvas.toDataURL("image/PNG");
      return result;
    });

    return img;
  };

  console.log(document.getElementById("tablaR"));

  return (
    <Document title={title}>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.title}>
          <Text>{`Reporte de información de ${title}`}</Text>
        </View>
        <HTML>
          {`
        <style>
            table {
              border: 1px solid black;
              font-size: 12pt;
              text-align: center;
              margin-top: 10px;
              margin-bottom: 10px;
            }
            table tbody {
              font-size: 10pt;
            }
        </style> 
        ${elementos.tablas?.map(
          (el) => document.getElementById(el)?.outerHTML
        )}`}
        </HTML>

        {elementos.graficas?.map((el, index) => (
          <Image source={chartToImage(el)} key={`${index}-grafica`} />
        ))}
        <View style={styles.legendTime} fixed>
          <Text>
            {`Impreso el ${new Intl.DateTimeFormat("es-MX", {
              dateStyle: "full",
              timeStyle: "short",
            }).format(new Date())}`}
          </Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}.`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default PDFReportes;

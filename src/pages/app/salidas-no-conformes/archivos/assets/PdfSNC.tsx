import Html from "react-pdf-html";
import gdl from "@assets/img/logo.png";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import calibri from "@assets/fonts/calibri.ttf";
import calibriN from "@assets/fonts/calibrib.ttf";
import calibrii from "@assets/fonts/calibrii.ttf";
import calibriitalicbold from "@assets/fonts/calibriitalicbold.ttf";
import TablaRevision from "@assets/pdf_assets/TablaRevision";

export interface PropsPdfSnc {
  title: string;
  fecha: string;
  inconformidad: string;
  corregir: string | null;
  concesiones: string | null;
  folio: number;
}

const PdfSNC: React.FC<PropsPdfSnc> = ({
  title,
  fecha,
  inconformidad,
  corregir,
  concesiones,
  folio,
}: PropsPdfSnc) => {
  Font.register({
    family: "calibri",
    fonts: [
      { src: calibri },
      { src: calibriN, fontWeight: "bold" },
      { src: calibrii, fontStyle: "italic" },
      { src: calibriitalicbold, fontStyle: "italic", fontWeight: "bold" },
    ],
    format: "truetype",
  });

  const styles = StyleSheet.create({
    page: {
      // marginVertical: "20px",
      marginVertical: "40px",
      marginHorizontal: "40px",
      fontFamily: "calibri",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      // border: "1px solid black",
      padding: "5px",
    },
    img: {
      width: "60px",
    },
    textCenter: {
      fontSize: "12pt",
      fontWeight: "bold",
    },
    fecha: {
      fontWeight: "bold",
      fontSize: "15pt",
    },
  });

  const estilosHTML = {
    // clear margins for all <p> tags
    p: {
      margin: "1px",
      fontSize: "12pt",
    },
    strong: {
      fontFamily: "calibri",
    },
    em: {
      fontFamily: "calibri",
    },
    ol: {
      margin: 0,
      padding: 0,
      fontSize: "12pt",
    },
    ul: {
      margin: 0,
      padding: 0,
      fontSize: "12pt",
    },
  };

  return (
    // <PDFViewer width="100%" height="100%">
    <Document title={title} style={{ marginBottom: "20px" }}>
      <Page
        size="LETTER"
        orientation="portrait"
        style={{ position: "relative" }}
      >
        <View style={styles.page}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              border: "1px solid black",
            }}
          >
            <View
              style={{
                width: "100px",
                height: "50px",
                borderRight: "1px solid black",
              }}
            >
              <Image
                src={gdl}
                style={{ width: "80px", marginHorizontal: "auto" }}
              ></Image>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.textCenter}>
                GASOLINERÍA DON LALO S.A DE C.V
              </Text>
              <Text style={styles.textCenter}>Salidas No Conformes</Text>
            </View>
            <View
              style={{
                width: "80px",
                height: "50px",
                borderLeft: "1px solid black",
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#d2d2d2",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: "12pt", fontWeight: "bold" }}>
                  Folio
                </Text>
                <Text style={{ fontSize: "10pt" }}>{folio}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: "40px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.fecha}>Fecha</Text>
            <View
              style={{
                border: "1px solid black",
                marginLeft: "40px",
                height: "100%",
                width: "180px",
                display: "flex",
              }}
            >
              <Text style={{ fontSize: "11pt", margin: "auto" }}>{fecha}</Text>
            </View>
          </View>
          <View style={{ marginTop: "20px" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "15pt",
              }}
            >
              Descripción de la falla (no conformidad):{" "}
            </Text>
            <View
              style={{
                minHeight: "150px",
                border: "1px solid black",
                padding: "5px",
              }}
            >
              <Html stylesheet={estilosHTML}>
                {inconformidad.charAt(0) === "<"
                  ? inconformidad
                  : `<p>${inconformidad}</p>`}
              </Html>
            </View>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: "15pt",
                marginTop: "15px",
              }}
            >
              Acciones aplicadas para corregir la falla:{" "}
            </Text>
            <View
              style={{
                minHeight: "100px",
                border: "1px solid black",
                padding: "5px",
              }}
            >
              {corregir ? (
                <Html stylesheet={estilosHTML}>
                  {corregir.charAt(0) === "<" ? corregir : `<p>${corregir}</p>`}
                </Html>
              ) : (
                <Text
                  style={{
                    fontSize: "12pt",
                  }}
                ></Text>
              )}
            </View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "16pt",
                marginTop: "15px",
              }}
            >
              En caso de autorizar la liberación de la falla sin aplicar ninguna
              acción, describir las concesiones:{" "}
            </Text>
            <View
              style={{
                minHeight: "80px",
                border: "1px solid black",
                marginTop: "5px",
                padding: "5px",
              }}
            >
              {concesiones ? (
                <Html stylesheet={estilosHTML}>
                  {concesiones.charAt(0) === "<"
                    ? concesiones
                    : `<p>${concesiones}</p>`}
                </Html>
              ) : (
                <Text
                  style={{
                    fontSize: "12pt",
                  }}
                ></Text>
              )}
            </View>
            <View
              style={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "row",
                fontSize: "13pt",
              }}
            >
              <Text>Autorizado por: </Text>
              <View
                style={{
                  marginLeft: "80px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Text>________________________________________</Text>
                <Text>Nombre y firma</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            // marginTop: "30px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <TablaRevision revision={1} retencion={1} />
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default PdfSNC;

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useMemo } from "react";
import HTML from "react-pdf-html";

interface elementos {
  tablas?: any[];
  graficas?: any[];
}

const PDFGraficas = (elementos: elementos, title: string) => {
  const styles = StyleSheet.create({
    page: {
      // flexDirection: "row",
      fontSize: "8pt",
      backgroundColor: "#fff",
      padding: "50px",
      width: "100%",
      position: "relative",
    },
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    theaderRow: {
      //fontFamily: "calibriN",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#e2e2e2",
      border: 1,
      borderColor: "#000",
      width: "100%",
    },
    theaderRowItems: {
      flexDirection: "row",
      backgroundColor: "#fff",
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: "#000",
      width: "100%",
      fontStyle: "bold",
    },
    theaderId: {
      paddingTop: 6,
      textAlign: "center",
      borderRight: 1,
      width: 35,
    },
    theaderNombre: {
      paddingTop: 6,
      borderRight: 1,
      paddingLeft: 4,
      textAlign: "left",
      width: 190,
    },
    theaderApellidoP: {
      paddingTop: 6,
      borderRight: 1,
      paddingLeft: 4,
      textAlign: "left",
      width: 130,
    },
    theaderApellidoM: {
      paddingTop: 6,
      borderRight: 1,
      paddingLeft: 4,
      textAlign: "left",
      width: 130,
    },
    theaderDepartamento: {
      paddingTop: 6,
      width: 160,
      paddingLeft: 4,
      textAlign: "left",
    },
    tbodyId: {
      textAlign: "center",
      borderRight: 1,
      width: 35,
    },
    tbodyNombre: {
      paddingLeft: 4,
      borderRight: 1,
      width: 190,
    },
    tbodyApellidoP: {
      paddingLeft: 4,
      borderLef: 1,
      borderRight: 1,
      width: 130,
    },
    tbodyApellidoM: {
      paddingLeft: 4,
      borderRight: 1,
      width: 130,
    },
    tbodyDepartamento: {
      textAlign: "center",
      width: 160,
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
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: "auto",
      position: "absolute",
      top: 10,
      left: 10,
    },
  });

  const tablas = useMemo(() => {
    return elementos.tablas;
  }, [elementos]);

  console.log(tablas);

  return (
    <Document title="Control de empleados">
      <Page size="LETTER" style={styles.page}>
        <View style={styles.title}>
          <Text>{`Reporte de información de ${title}`}</Text>
        </View>

        {/* <HTML resetStyles>{`<html>
  <body>
    <style>
      .my-heading4 {
        background: darkgreen;
        color: white;
      }
      pre {
        background-color: #eee;
        padding: 10px;
      }
    </style>
    <h1>Heading 1</h1>
    <h2 style="background-color: pink">Heading 2</h2>
    <h3>Heading 3</h3>
    <h4 class="my-heading4">Heading 4</h4>
    <p>
      Paragraph with <strong>bold</strong>, <i>italic</i>, <u>underline</u>,
      <s>strikethrough</s>,
      <strong><u><s><i>and all of the above</i></s></u></strong>
    </p>
    <p>
      Paragraph with image and
      <a href="http://google.com">link</a>
    </p>
    <hr />
    <ul>
      <li>Unordered item</li>
      <li>Unordered item</li>
    </ul>
    <ol>
      <li>Ordered item</li>
      <li>Ordered item</li>
    </ol>
    <br /><br /><br /><br /><br />
    Text outside of any tags
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Foo</td>
          <td>Bar</td>
          <td>Foobar</td>
        </tr>
        <tr>
          <td colspan="2">Foo</td>
          <td>Bar</td>
        </tr>
        <tr>
          <td>Some longer thing</td>
          <td>Even more content than before!</td>
          <td>Even more content than before!</td>
        </tr>
      </tbody>
    </table>
    <div style="width: 200px; height: 200px; background: pink"></div>
    <pre>

</pre>
  </body>
</html>
`}</HTML> */}
        <HTML>{`${elementos.tablas?.[0]}`}</HTML>

        <Text
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}.`
          }
          fixed
        />
        <View style={styles.legendTime}>
          <Text>Impreso el </Text>
          <Text>
            {new Intl.DateTimeFormat("es-MX", {
              dateStyle: "full",
              timeStyle: "short",
            }).format(new Date())}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGraficas;

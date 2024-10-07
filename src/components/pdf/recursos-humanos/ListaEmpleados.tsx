import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { empleadoInterface } from "@assets/interfaces";

type empleadoMod = Omit<
  empleadoInterface,
  "nombre_completo" | "departamento"
> & { departamento: string; update_time_imss: string | null };

const ListaEmpleados = (data: empleadoMod[], title: string) => {
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

  const Theader = () => {
    return (
      <View style={styles.theaderRow}>
        <Text style={styles.theaderId}>Id</Text>
        <Text style={styles.theaderNombre}>Nombre</Text>
        <Text style={styles.theaderApellidoP}>Apellido Paterno</Text>
        <Text style={styles.theaderApellidoM}>Apellido Materno</Text>
        <Text style={styles.theaderDepartamento}>Departamento</Text>
      </View>
    );
  };

  const Tbody = ({ data }: { data: empleadoMod }) => {
    return (
      <View style={styles.theaderRowItems}>
        <>
          <Text style={styles.tbodyId}>{data.idchecador || "--"}</Text>
          <Text style={styles.tbodyNombre}>{data.nombre}</Text>
          <Text style={styles.tbodyApellidoP}>{data.apellido_paterno}</Text>
          <Text style={styles.tbodyApellidoM}>{data.apellido_materno}</Text>
          <Text style={styles.tbodyDepartamento}>{data.departamento}</Text>
        </>
      </View>
    );
  };

  return (
    <Document title="Control de empleados">
      <Page size="LETTER" style={styles.page}>
        <View style={styles.title}>
          <Text>{`Reporte de información de ${title}`}</Text>
        </View>

        <View style={styles.tableContainer} wrap>
          <Theader />

          {data && data.map((el) => <Tbody key={el.idempleado} data={el} />)}
        </View>
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

export default ListaEmpleados;

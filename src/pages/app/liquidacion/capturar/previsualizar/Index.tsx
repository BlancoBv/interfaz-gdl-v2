import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import moment from "moment";
import { FC, useContext } from "react";
import { ContextLiq, manguerasInterface } from "../../components/ContextLiq";
import Table from "@components/Table";
import format from "@assets/format";
import Decimal from "decimal.js-light";
import { ModalConfirmNoMutate } from "@components/gui/Modal";
import { useSendData } from "@hooks/useSendData";
import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";
import SendingScreen from "./components/SendingScreen";
import { getDataInterface, useGetData } from "@hooks/useGetData";

interface preliquidacionExist extends getDataInterface {
  data: { response: null | { vales: string[]; efectivo: string[] } };
}

const Previsualizar: FC = () => {
  //const date = new Date(Date.now());

  const { empleado, estacionServicio, turno } =
    useContext(ContextLiq).otherData;
  const { body: mangueras } = useContext(ContextLiq).mangueras;
  const { body: efectivo } = useContext(ContextLiq).efectivo;
  const { body: vales } = useContext(ContextLiq).vales;
  const { body: error } = useContext(ContextLiq).error;
  const { body: infoGeneral } = useContext(ContextLiq).infoGeneral;
  const totales = useContext(ContextLiq).totales;
  const cleanAll = useContext(ContextLiq).cleanAll;

  const preliquidacionExist: preliquidacionExist = useGetData(
    `liquidacion/buscar-preliquidacion?idEmpleado=${infoGeneral.horario?.idempleado}&fechaTurno=${infoGeneral.horario?.fechaliquidacion}&idEstacionServicio=${infoGeneral.horario?.estacion_servicio.idestacion_servicio}&idTurno=${infoGeneral.horario?.turno.idturno}`,
    "preliqExistenteData"
  );

  //const navigate = useNavigate();

  const confirmValues = async (
    mangueras: manguerasInterface
  ): Promise<boolean> => {
    const response = await preliquidacionExist.refetch();
    const {
      vales: valesPreliq,
      efectivo: efectivoPreliq,
      lecturas: lecturasPreliq,
    }: {
      vales: string[];
      efectivo: string[];
      lecturas: { litrosVendidos: number; precioUnitario: string }[];
    } = response.data?.response;

    const totalValesPreq = valesPreliq.reduce(
      (a, b) => new Decimal(Number(a)).add(Number(b)).toFixed(2),
      "0"
    );
    const totalEfectivoPreq = efectivoPreliq.reduce(
      (a, b) => new Decimal(Number(a)).add(Number(b)).toFixed(2),
      "0"
    );

    const totalValesLocal = vales.reduce(
      (a, b) => new Decimal(Number(a)).add(Number(b.monto)).toFixed(2),
      "0"
    );
    const totalEfectivoLocal = efectivo.reduce(
      (a, b) => new Decimal(Number(a)).add(Number(b.monto)).toFixed(2),
      "0"
    );

    const totalEntregadoPreliq = new Decimal(
      Number(totalEfectivoPreq) + Number(totalValesPreq)
    ).toFixed(2);

    const totalEntregado = new Decimal(
      Number(totalEfectivoLocal) + Number(totalValesLocal)
    ).toFixed(2);

    const totalCalculadoPreq = lecturasPreliq
      .map((el) =>
        new Decimal(el.litrosVendidos * Number(el.precioUnitario)).toFixed(2)
      )
      .reduce((a, b) => new Decimal(a).add(Number(b)).toFixed(2), "0");

    const totalCalculado = Object.values(mangueras).reduce(
      (a, b) => new Decimal(Number(a)).add(Number(b.importe)).toFixed(2),
      "0"
    );

    console.log({
      totalEntregado,
      totalEntregadoPreliq,
      totalCalculado,
      totalCalculadoPreq,
    });

    if (
      Number(totalEntregado) === Number(totalEntregadoPreliq) &&
      Number(totalCalculado) === Number(totalCalculadoPreq)
    ) {
      return false;
    }

    return true;
    /*     return Object.values(mangueras).some(
      (el) => !el.hasOwnProperty("lecturaFinal")
    ); */
  };

  const sendPreliq = useSendData("pdf/sendFile", {
    customFn: cleanAll,
    method: "post",
    refetchFn: () => {},
  });

  const handleSend = async () => {
    handleSend: {
      console.log(await confirmValues(mangueras));

      if (await confirmValues(mangueras)) {
        toast.error("Las lecturas capturadas no coinciden.", {
          containerId: "global",
        });
        //navigate("/preliquidacion/capturar-lecturas");
        break handleSend;
      }
      if (efectivo.length < 1) {
        toast.error("No ingresaste ningun monto de efectivo", {
          containerId: "global",
        });
        //navigate("/preliquidacion/capturar-efectivo");
        break handleSend;
      }
      if (vales.length < 1) {
        toast.error("No ingresaste ningun monto de vales", {
          containerId: "global",
        });
        //navigate("/preliquidacion/capturar-vales");
        break handleSend;
      }
      sendPreliq.mutate({
        data: { error, ...infoGeneral, ...totales, mangueras },
        otherData: {
          empleado,
          turno,
          estacionServicio,
          efectivo: efectivo,
          vales: vales,
        },
      });
    }
  };
  return (
    <div className="w-full">
      <SendingScreen isPending={sendPreliq.isPending} />
      <ModalConfirmNoMutate
        action={handleSend}
        customID="confirm-enviar"
        msg="Asegurate de que todos los datos son correctos, ¿Deseas continuar?"
        title="Confirmar guardar liquidación"
        closeOnESC
      />
      <SectionTitle
        titulo="Previsualizar preliquidación"
        subtitulo="Preliquidación"
        noBackButton
      />
      {/* Stats */}
      {/*       <div className="stats stats-vertical lg:stats-horizontal shadow mb-4 w-full">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="calendar-days" size="2x" />
          </div>
          <div className="stat-title">Fecha</div>
          <div className="stat-value text-lg">{moment(date).format("L")}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="user" size="2x" />
          </div>
          <div className="stat-title">Despachador</div>
          <div className="stat-value text-wrap lg:max-w-60 text-lg">
            {empleado?.nombre_completo}
          </div>
          <div className="stat-desc">ID: {empleado?.idempleado} </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="business-time" size="2x" />
          </div>
          <div className="stat-title">Turno</div>
          <div className="stat-value text-lg">{turno?.turno}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="tent" size="2x" />
          </div>
          <div className="stat-title">Estación servicio</div>
          <div className="stat-value text-lg">{estacionServicio?.nombre}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="gas-pump" size="2x" />
          </div>
          <div className="stat-title">Islas</div>
          <div className="stat-value text-lg">
            {islas.map((el) => `Isla ${el.nisla}`).join(", ")}
          </div>
        </div>
      </div> */}
      {/* Tabla de lecturas */}
      <div className="prose w-full max-w-full">
        <h3>Lecturas</h3>

        <Table
          data={Object.values(mangueras)}
          columns={[
            { name: "Manguera", selector: (el) => el.idmangueraGenerico },
            { name: "Lectura inicial", selector: (el) => el.lecturaInicial },
            {
              name: "Lectura final",
              selector: (el) =>
                el.hasOwnProperty("lecturaFinal") ? el.lecturaFinal : "---",
            },
            {
              name: "Litros vendidos",
              selector: (el) =>
                el.hasOwnProperty("litrosVendidos") ? el.litrosVendidos : "---",
            },
            {
              name: "Precio unitario",
              selector: (el) => format.formatDinero(el.precioUnitario),
            },
            {
              name: "Importe",
              selector: (el) =>
                el.hasOwnProperty("lecturaFinal")
                  ? format.formatDinero(
                      new Decimal(Number(el.precioUnitario))
                        .mul(Number(el.litrosVendidos))
                        .toFixed(2)
                    )
                  : "---",
            },
          ]}
        />
      </div>
      {/* Tablas de efectivo y vales */}
      <div className="flex gap-4 my-4">
        <div className="prose w-1/2 max-w-full">
          <h3>Efectivo</h3>
          <Table
            data={efectivo}
            columns={[
              {
                name: "Monto",
                selector: (el) => format.formatDinero(el.monto),
              },
            ]}
          />
        </div>
        <div className="prose w-1/2 max-w-full">
          <h3>Vales</h3>
          <Table
            data={vales}
            columns={[
              {
                name: "Monto",
                selector: (el) => format.formatDinero(el.monto),
              },
            ]}
          />
        </div>
      </div>
      {/* Tabla de total documentos */}
      <div className="flex justify-center">
        <div className="prose w-1/2 max-w-full">
          <h3>Total de documentos</h3>
          <Table
            data={[
              { documento: "Vales", total: vales.length },
              { documento: "Efectivo", total: efectivo.length },
              {
                documento: "Total",
                total: vales.length + efectivo.length,
              },
            ]}
            columns={[
              { name: "Documento", selector: (el) => el.documento },
              { name: "Cantidad", selector: (el) => el.total },
            ]}
          />
        </div>
      </div>
      <button
        className="btn btn-primary mt-4 btn-block"
        onClick={() => {
          (
            document.getElementById("confirm-enviar") as HTMLDialogElement
          ).showModal();
        }}
      >
        Enviar
      </button>
    </div>
  );
};
export default Previsualizar;

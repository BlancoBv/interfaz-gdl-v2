import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import moment from "moment";
import { FC, useContext } from "react";
import { ContextPreliq, manguerasInterface } from "../components/ContextPreliq";
import Table from "@components/Table";
import format from "@assets/format";
import Decimal from "decimal.js-light";
import { ModalConfirmNoMutate } from "@components/gui/Modal";
import { useSendData } from "@hooks/useSendData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SendingScreen from "./components/SendingScreen";

const Previsualizar: FC = () => {
  const date = new Date(Date.now());

  const { empleado, estacionServicio, turno, islas } =
    useContext(ContextPreliq).otherData;
  const { body: mangueras } = useContext(ContextPreliq).mangueras;
  const { body: efectivo } = useContext(ContextPreliq).efectivo;
  const { body: vales } = useContext(ContextPreliq).vales;
  const { body: error } = useContext(ContextPreliq).error;
  const { body: infoGeneral } = useContext(ContextPreliq).infoGeneral;
  const totales = useContext(ContextPreliq).totales;
  const cleanAll = useContext(ContextPreliq).cleanAll;

  const navigate = useNavigate();

  const confirmValues = (mangueras: manguerasInterface[]): boolean => {
    return mangueras.some((el) => !el.hasOwnProperty("lecturaFinal"));
  };

  const sendPreliq = useSendData("pdf/sendFile", {
    customFn: cleanAll,
    method: "post",
  });

  const handleSend = () => {
    handleSend: {
      if (confirmValues(mangueras)) {
        toast.error("Una o más lecturas estan sin capturar", {
          containerId: "global",
        });
        navigate("/preliquidacion/capturar-lecturas");
        break handleSend;
      }
      if (efectivo.cantidad.length < 1) {
        toast.error("No ingresaste ningun monto de efectivo", {
          containerId: "global",
        });
        navigate("/preliquidacion/capturar-efectivo");
        break handleSend;
      }
      if (vales.cantidad.length < 1) {
        toast.error("No ingresaste ningun monto de vales", {
          containerId: "global",
        });
        navigate("/preliquidacion/capturar-vales");
        break handleSend;
      }
      sendPreliq.mutate({
        data: { error, ...infoGeneral, ...totales, mangueras },
        otherData: {
          empleado,
          turno,
          estacionServicio,
          efectivo: efectivo.cantidad,
          vales: vales.cantidad,
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
        title="Confirmar guardar preliquidación"
        closeOnESC
      />
      <SectionTitle
        titulo="Previsualizar preliquidación"
        subtitulo="Preliquidación"
      />
      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-4 w-full">
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
      </div>
      {/* Tabla de lecturas */}
      <div className="prose w-full max-w-full">
        <h3>Lecturas</h3>

        <Table
          data={mangueras}
          columns={[
            { name: "Manguera", selector: (el) => el.idManguera },
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
            data={efectivo.cantidad}
            columns={[
              { name: "Monto", selector: (el) => format.formatDinero(el) },
            ]}
          />
        </div>
        <div className="prose w-1/2 max-w-full">
          <h3>Vales</h3>
          <Table
            data={vales.cantidad}
            columns={[
              { name: "Monto", selector: (el) => format.formatDinero(el) },
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
              { documento: "Vales", total: vales.cantidad.length },
              { documento: "Efectivo", total: efectivo.cantidad.length },
              {
                documento: "Total",
                total: vales.cantidad.length + efectivo.cantidad.length,
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

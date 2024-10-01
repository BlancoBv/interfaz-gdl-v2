import {
  islasInterface,
  registrosChecklistInterface,
} from "@assets/interfaces";
import SectionTitle from "@components/gui/SectionTitle";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, SyntheticEvent, useState } from "react";
import IslasContainer from "./components/IslasContainer";
import Modal from "@components/gui/Modal";
import { SelectMonth, SelectYear } from "@components/forms/Select";
import moment from "moment";
import Table from "@components/Table";
import NoData from "@components/gui/NoData";
import Icon from "@components/Icon";
import format from "@assets/format";
import Loader from "@components/gui/Loader";
interface islas extends getDataInterface {
  data: { response: islasInterface[] };
}
const RegistrosChecklist: FC = () => {
  const date = new Date(Date.now());
  const values = sessionStorage.getItem("regChecklistFiltros") || null;
  const parsedValues = values
    ? JSON.parse(values)
    : { year: moment(date).year(), month: moment(date).month() + 1 };

  const [relativeData, setRelativeData] = useState<
    Partial<Pick<islasInterface, "idisla" | "idestacion_servicio" | "nisla">>
  >({});
  const [filtros, setFiltros] = useState<{ month?: number; year?: number }>(
    parsedValues
  );
  const isla1: islas = useGetData("liquidacion/islas/1", "islasEst1");
  const isla2: islas = useGetData("liquidacion/islas/2", "islasEst2");
  const { data, isError, isPending, refetch } = useGetData(
    `bomba-check/registro-checklist?idIsla=${relativeData.idisla}&month=${filtros.month}&year=${filtros.year}`,
    "regCheckData",
    { fetchInURLChange: true }
  );

  const filtrar = (ev: SyntheticEvent) => {
    ev.preventDefault();
    sessionStorage.setItem("regChecklistFiltros", JSON.stringify(filtros));
    refetch();
  };

  return (
    <div>
      <Modal
        id="modal-registros"
        title={`Registros de la isla ${relativeData.nisla} en GDL${relativeData.idestacion_servicio}`}
      >
        <div className="h-96 flex flex-col overflow-y-auto">
          <form
            onSubmit={filtrar}
            className="sticky top-0 flex justify-center items-center gap-4 mb-4 z-50 bg-base-100/80 backdrop-blur-sm pb-4"
          >
            <SelectYear
              label="Año"
              name="year"
              variable={filtros}
              setVariable={setFiltros}
              required
            />
            <SelectMonth
              label="Mes"
              name="month"
              variable={filtros}
              setVariable={setFiltros}
              required
            />
            {/* <button type="submit" className="btn btn-primary">
              Filtrar
            </button> */}
          </form>
          <Loader isPending={isPending} />
          {!isPending && !isError && (
            <Table
              data={data.response}
              columns={[
                {
                  name: "Empleado saliente",
                  selector: (el: registrosChecklistInterface) =>
                    el.empleado_saliente.nombre_completo,
                },
                {
                  name: "Empleado entrande",
                  selector: (el: registrosChecklistInterface) =>
                    el.empleado_saliente.nombre_completo,
                },
                {
                  name: "Isla limpia",
                  selector: (el: registrosChecklistInterface) => (
                    <div>
                      {el.isla_limpia ? (
                        <span className="text-success">
                          <Icon icon="check" size="2x" />
                        </span>
                      ) : (
                        <span className="text-error">
                          <Icon icon="xmark" size="2x" />
                        </span>
                      )}
                    </div>
                  ),
                },
                {
                  name: "Aceites completos",
                  selector: (el: registrosChecklistInterface) => (
                    <div>
                      {el.aceites_completos ? (
                        <span className="text-success">
                          <Icon icon="check" size="2x" />
                        </span>
                      ) : (
                        <span className="text-error">
                          <Icon icon="xmark" size="2x" />
                        </span>
                      )}
                    </div>
                  ),
                },
                {
                  name: "Turno",
                  selector: (el: registrosChecklistInterface) => el.turno.turno,
                },
                {
                  name: "Fecha",
                  selector: (el: registrosChecklistInterface) =>
                    format.formatFecha(el.fecha),
                },
              ]}
            />
          )}
          <NoData isError={isError} isPending={isPending} />
        </div>
      </Modal>
      <SectionTitle
        titulo="Registros de checklist bomba"
        subtitulo="Despacho"
      />
      <Loader isPending={isla1.isPending && isla2.isPending} />
      {!isla1.isPending &&
        !isla2.isPending &&
        !isla1.isError &&
        !isla2.isError && (
          <>
            <IslasContainer
              data={isla1.data.response}
              setRelativeData={setRelativeData}
            />
            <IslasContainer
              data={isla2.data.response}
              setRelativeData={setRelativeData}
            />
          </>
        )}
    </div>
  );
};
export default RegistrosChecklist;

import { PageData } from "../../hooks";
import { AxisOptions, Chart } from "react-charts";
import { useMemo } from "react";
import clsx from "clsx";

type Props = Readonly<{
  data: PageData[];
  factor: { label: string; key: string };
}>;

type ChartItem = {
  position: number;
  value: number;
  factor: { label: string; key: string };
  url: string;
};

function AnalysisChart({ data, factor }: Props) {
  const charts = useMemo((): { label: string; data: ChartItem[] }[] => {
    const _charts: { label: string; data: ChartItem[] }[] = [];

    const _data = data.filter((item) => item.position !== 0);
    const _competitorsData = data.filter((item) => item.position === 0);

    const chart: { label: string; data: ChartItem[] } = {
      label: factor.label,
      data: [],
    };

    for (const item of _data) {
      chart.data.push({
        position: item.position,
        value: item.factors[factor.key] ?? 0,
        factor,
        url: item.url,
      });
    }

    _charts.push(chart);

    for (const item of _competitorsData) {
      _charts.push({
        label: item.url,
        data: _data.map((_, i) => ({
          url: item.url,
          position: i + 1,
          factor,
          value: item.factors[factor.key] ?? 0,
        })),
      });
    }

    return _charts;
  }, [data]);

  const primaryAxis = useMemo(
    (): AxisOptions<ChartItem> => ({
      getValue: (datum) => datum.position,
      formatters: {
        tooltip: (x: number) => {
          const item = data[x];
          if (item) return item.url;
          return "";
        },
      },
    }),
    [],
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ChartItem>[] => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    [],
  );

  if (!data.length) return null;

  return (
    <div className={clsx("w-full mb-4")}>
      <h3 className={"text-xl font-semibold mb-4"}>{factor.label}</h3>
      <div className={"h-64"}>
        <Chart
          options={{
            data: charts,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
}

export default AnalysisChart;

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
  const chartItems = useMemo((): ChartItem[] => {
    const _data: ChartItem[] = [];

    for (const item of data) {
      _data.push({
        position: item.position,
        value: item.factors[factor.key] ?? 0,
        factor,
        url: item.url,
      });
    }

    return _data;
  }, [data]);

  const primaryAxis = useMemo(
    (): AxisOptions<ChartItem> => ({
      getValue: (datum) => datum.position,
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
            data: [
              {
                label: factor.label,
                data: chartItems,
              },
            ],
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
}

export default AnalysisChart;

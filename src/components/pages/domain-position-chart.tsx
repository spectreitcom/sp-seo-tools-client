import { AxisOptions, Chart } from "react-charts";
import clsx from "clsx";
import { useMemo } from "react";
import { DomainPositionHistory } from "../../hooks";

type Props = Readonly<{
  className?: string;
  data: DomainPositionHistory[];
}>;

type ChartItem = {
  domainPositionId: string;
  createdAt: Date;
  position: number;
};

function DomainPositionChart({ className, data }: Props) {
  const chartItems = useMemo((): ChartItem[] => {
    let _data: ChartItem[] = [];

    for (const item of data) {
      _data.push({
        ...item,
        createdAt: new Date(item.createdAt),
      });
    }

    const shouldCreateEmptyPoint =
      !_data.length || !_data.filter((item) => item.position !== null).length;

    // Note! This fallback data is required. Without it the application is crashing
    if (shouldCreateEmptyPoint) {
      _data = [
        {
          domainPositionId: "",
          createdAt: new Date(),
          position: 0,
        },
      ];
    }

    return _data;
  }, [data]);

  const primaryAxis = useMemo(
    (): AxisOptions<ChartItem> => ({
      getValue: (datum) => datum.createdAt,
    }),
    [],
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ChartItem>[] => [
      {
        getValue: (datum) => datum.position,
        invert: true,
        min: 1,
      },
    ],
    [],
  );

  return (
    <div className={clsx("w-full h-64", className)}>
      <Chart
        options={{
          data: [
            {
              label: "Domain Position",
              data: chartItems,
            },
          ],
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}

export default DomainPositionChart;

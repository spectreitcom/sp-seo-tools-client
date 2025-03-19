import { AxisOptions, Chart } from "react-charts";
import clsx from "clsx";
import { useMemo } from "react";
import { DomainPositionHistory } from "../../hooks/use-domain-history-position.ts";

type Props = {
  className?: string;
  data: DomainPositionHistory[];
};

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

    // Note! This fallback data is required. Without it the application is crashing
    if (!_data.length) {
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
          // data: data2,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}

export default DomainPositionChart;

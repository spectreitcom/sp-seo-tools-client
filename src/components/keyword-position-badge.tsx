import Badge from "./badge.tsx";

type Props = {
  position: number;
};

function KeywordPositionBadge({ position }: Props) {
  if (position > 0 && position <= 10) {
    return <Badge text={position} color={"success"} />;
  }
  if (position > 10 && position <= 50) {
    return <Badge text={position} color={"warning"} />;
  }
  if (position === 0) {
    return <Badge text={"Position not found"} color={"danger"} />;
  }
}

export default KeywordPositionBadge;

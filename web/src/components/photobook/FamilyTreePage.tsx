import { useEffect, useState } from "react";
import { Family } from "../../gql/graphql";
import { JsonGedcomData } from "topola";
import { familyToTopolaData } from "../../converters/TopolaDataConveter";
import { FamilyTree } from "../FamilyTree";
import { CircularProgress } from "@mui/material";

interface FamilyTreePageProps {
  family: Family;
  pageNum: number;
  pageStyle?: React.CSSProperties;
  pages?: Record<string, number>;
}

export const FamilyTreePage = ({
  family,
  pageNum,
  pageStyle,
  pages,
}: FamilyTreePageProps) => {
  const [chartData, setChartData] = useState(null as JsonGedcomData | null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (family) {
      setLoading(true);
      familyToTopolaData(family, pages).then(
        (data) => {
          setChartData(data);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        },
      );
    }
  }, [family]);

  return (
    <>
      <div
        className={
          `page-left-${family.grampsId} page ` +
          (pageNum % 2 === 0 ? "leftSide" : "rightSide")
        }
        style={pageStyle}
      >
        {loading && <CircularProgress />}
        {chartData && <FamilyTree tree={chartData} />}
        <span className="pageNum">{pageNum}</span>
      </div>
    </>
  );
};

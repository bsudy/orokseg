import { useEffect, useState } from "react";
import { Family } from "../gql/graphql";
import { JsonGedcomData } from "topola";
import { familyToTopolaData } from "../converters/TopolaDataConveter";
import { FamilyTree } from "./FamilyTree";
import { CircularProgress } from "@mui/material";
import { MediumPreview } from "./MediumPreview";


interface PhotoBookPageProps {
  family: Family;
  pageNum: number;
}

const a = {
  b: 1,
  c: 2,
}

function* range(start: number, end: number) {
  const step = start < end ? 1 : -1;
  if (step > 0) {
      for (let i = start; i <= end; i += step) {
          yield i;
      }
  } else {
      for (let i = start; i >= end; i += step) {
          yield i;
      }
  }
}


function calculateWidth(imageRations: number[], row: number): number {
  
  
  if (imageRations.length < row) {
    throw new Error("Not enough images");
  }

  // if (row === 1) {
  //   return maxHeight;
  // }
  const runners = new Array(row).fill(0);

  const rowWidth = new Array(row).fill(0);

  imageRations.forEach((imageRation, idx) => {
    if (idx < row) {
      rowWidth[idx] = rowWidth[idx] + imageRation;
      runners[idx] = idx;
    } else {
      rowWidth[row - 1] = rowWidth[row - 1] + imageRation;
    }
  });

  let loop = 100;
  while (loop-- > 0) {

    // determine the longest row
    const [longestWidth, longestIdx] = rowWidth.reduce(([prevVal, prevIdx], val, idx) => {
      if (val > prevVal) {
        return [val, idx];
      }
      return [prevVal, prevIdx];
    }, [0, -1])


    const [shortestWitdh, shortestIdx] = rowWidth.reduce(([prevVal, prevIdx], val, idx) => {
      if (val < prevVal) {
        return [val, idx];
      }
      return [prevVal, prevIdx];
    }, [Number.MAX_VALUE, -1]);

    console.log(`Iteration for rows: ${row} longest: ${longestIdx}:${longestWidth} shotest:${shortestIdx}:${shortestWitdh}`);
    console.log("rowWidth", rowWidth);
    const direction = longestIdx < shortestIdx ? 1 : -1;
    if (shortestIdx == longestIdx) {
      return longestWidth;
    }
    for (let idx = longestIdx; idx !== shortestIdx; idx += direction) {
      const nextIdx = idx + direction;
      //grab the image to be moved
      if (direction === 1) {
        // moving up
        const imgToBeMovedRatio = imageRations[runners[nextIdx] - 1];
        console.log("Moving up", imgToBeMovedRatio, runners[nextIdx] - 1, nextIdx, runners);

        rowWidth[idx] = rowWidth[idx] - imgToBeMovedRatio;
        rowWidth[nextIdx] = rowWidth[nextIdx] + imgToBeMovedRatio;

        // update runner position
        runners[nextIdx] = runners[nextIdx] - 1;
        
      } else {
        // moving down
        const imgToBeMovedRatio = imageRations[runners[idx]];
        console.log("Moving down", imgToBeMovedRatio, runners[idx], idx, runners);

        rowWidth[idx] = rowWidth[idx] - imgToBeMovedRatio;
        rowWidth[nextIdx] = rowWidth[nextIdx] + imgToBeMovedRatio;

        // update runner position
        runners[idx] = runners[idx] + 1;
        console.log("rowWidth", rowWidth);
      }
      const currentLongest = Math.max(...rowWidth);

      if (currentLongest < longestWidth) {
        console.log("Found better solution");
        break;
      }
      // if we are here there was not better solution
      console.log("No better solution", longestWidth, currentLongest);
      return longestWidth;
    };
  }
  return 1;
}

function determineRowNumber(imageRations: number[]): number {
  // function determineRowNumber(images: ImageData[]) {
  console.log("imageRations", imageRations);
  let rows = 1;
  const previouseWidth = Number.MAX_VALUE;
  while (true) {
    const width = calculateWidth(imageRations, rows);
    console.log(`rows: ${rows} width: ${width}`);
    if (width >= previouseWidth) {
      return rows - 1;
    }
    if (width < (rows + 1)) {
      return rows;
    }
    rows++;
  }
}




export const PhotoBookPage = ({ family, pageNum }: PhotoBookPageProps) => {

  const [chartData, setChartData] = useState(null as JsonGedcomData | null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (family) {
      setLoading(true);
      familyToTopolaData(family).then((data) => {
        setChartData(data);
        setLoading(false);
      }, (err) => {
        console.error(err);
        setLoading(false);
      });
    
    }
  }, [family]);

  const [imageRations, setImageRations] = useState({} as Record<string, number>);
  const [imageHeight, setImageHeight] = useState(undefined as string | undefined);

  const imageOnload = (evt: React.SyntheticEvent<HTMLImageElement>, grampsId: string) => {
    const target = (evt.target as HTMLImageElement);
    console.log("Image loaded", grampsId, target.width, target.height);
    setImageRations((prev) => {
      return {
        ...prev,
        [grampsId]: target.width / target.height
      };
    });
  };
      
  useEffect(() => {
    if (!family || !family.mediumRefs || family.mediumRefs.length === 0) {
      return;
    }
    console.log("imageRations", imageRations);
    for (const mediumRef of family.mediumRefs || []) {
      console.log("mediumRef", mediumRef);
      if (!imageRations[mediumRef.medium.grampsId]) {
        console.log("missing", mediumRef.medium.grampsId);
        return;
      }
    }
    console.log("All images are loaded");


    const rows = determineRowNumber((family.mediumRefs || []).map((mediumRef) => imageRations[mediumRef.medium.grampsId]));
    console.log("rows", rows);
    setImageHeight(`${ 100 / rows }%`);
  }, [imageRations, family]);

  return (
    <div className="photobBookPage" style={{backgroundColor: 'lightgray'}}>
      <div className="page leftSide">
        <div className="photoPage">
        
          {(family.mediumRefs || []).map((mediumRef, idx) => {
            return (
              <div
                key={mediumRef.medium.grampsId}
                className="photoBook-page-medium"
                style={{ height: imageHeight, padding: '10px' }}
              >
                <MediumPreview
                  mediumRef={mediumRef}
                  onLoad={(evt) => imageOnload(evt, mediumRef.medium.grampsId)}
                />
              </div>
            );
          })}
          <span className="pageNum">{pageNum}</span>
        </div>
      </div>
      <div className="page rightSide">
        {loading && <CircularProgress />}
        {chartData && <FamilyTree tree={chartData} />}
        <span className="pageNum">{pageNum + 1}</span>
      </div>
    </div>

  );
};
import { useEffect, useState } from "react";
import { Family } from "../../gql/graphql";
import { CircularProgress } from "@mui/material";
import { MediumPreview } from "../MediumPreview";

interface PhotosPage {
  family: Family;
  pageNum: number;
}

function calculateWidth(imageRations: number[], row: number): number {
  if (imageRations.length < row) {
    throw new Error("Not enough images");
  }

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
    const [longestWidth, longestRowIdx] = rowWidth.reduce(
      ([prevVal, prevIdx], val, idx) => {
        if (val > prevVal) {
          return [val, idx];
        }
        return [prevVal, prevIdx];
      },
      [0, -1],
    );

    const [, shortestRowIdx] = rowWidth.reduce(
      ([prevVal, prevIdx], val, idx) => {
        if (val < prevVal) {
          return [val, idx];
        }
        return [prevVal, prevIdx];
      },
      [Number.MAX_VALUE, -1],
    );

    // console.log(`Iteration for rows: ${row} longest: ${longestRowIdx}:${longestWidth} shotest:${shortestRowIdx}:${shortestWidth}`);
    // console.log("rowWidth", rowWidth);
    const direction = longestRowIdx < shortestRowIdx ? 1 : -1;
    if (shortestRowIdx === longestRowIdx) {
      return longestWidth;
    }
    for (let idx = longestRowIdx; idx !== shortestRowIdx; idx += direction) {
      const nextIdx = idx + direction;
      //grab the image to be moved
      if (direction === 1) {
        // moving up
        const imgToBeMovedRatio = imageRations[runners[nextIdx] - 1];
        console.log(
          "Moving up",
          imgToBeMovedRatio,
          runners[nextIdx] - 1,
          nextIdx,
          runners,
        );

        rowWidth[idx] = rowWidth[idx] - imgToBeMovedRatio;
        rowWidth[nextIdx] = rowWidth[nextIdx] + imgToBeMovedRatio;

        // update runner position
        runners[nextIdx] = runners[nextIdx] - 1;
      } else {
        // moving down
        const imgToBeMovedRatio = imageRations[runners[idx]];
        console.log(
          "Moving down",
          imgToBeMovedRatio,
          runners[idx],
          idx,
          runners,
        );

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
    }
  }
  return 1;
}

function determineRowNumber(imageRations: number[]): number {
  console.log("imageRations", imageRations);
  let rows = 1;
  const previouseWidth = Number.MAX_VALUE;
  while (true) {
    const width = calculateWidth(imageRations, rows);
    console.log(`rows: ${rows} width: ${width}`);
    if (width >= previouseWidth) {
      return rows - 1;
    }
    if (width < rows + 1) {
      return rows;
    }
    rows++;
  }
}

export const PhotosPage = ({ family, pageNum }: PhotosPage) => {
  const [loading, setLoading] = useState(true);

  const [imageRations, setImageRations] = useState(
    {} as Record<string, number>,
  );
  const [imageHeight, setImageHeight] = useState(
    undefined as string | undefined,
  );

  const imageOnload = (
    evt: React.SyntheticEvent<HTMLImageElement>,
    grampsId: string,
  ) => {
    const target = evt.target as HTMLImageElement;
    console.log("Image loaded", grampsId, target.width, target.height);
    setImageRations((prev) => {
      return {
        ...prev,
        [grampsId]: target.width / target.height,
      };
    });
  };

  useEffect(() => {
    if (!family || !family.mediumRefs || family.mediumRefs.length === 0) {
      return;
    }
    for (const mediumRef of family.mediumRefs || []) {
      if (!imageRations[mediumRef.medium.grampsId]) {
        return;
      }
    }

    const rows = determineRowNumber(
      (family.mediumRefs || []).map(
        (mediumRef) => imageRations[mediumRef.medium.grampsId],
      ),
    );
    setImageHeight(`${100 / rows}%`);
    setLoading(false);
  }, [imageRations, family]);

  return (
    <>
      <div
        className={
          `page-left-${family.grampsId} page ` +
          (pageNum % 2 === 0 ? "leftSide" : "rightSide")
        }
      >
        <div className="photoPage">
          {(family.mediumRefs || []).map((mediumRef) => {
            return (
              <div
                key={mediumRef.medium.grampsId}
                className="photoBook-page-medium"
                style={{ height: imageHeight, padding: "10px" }}
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
    </>
  );
};

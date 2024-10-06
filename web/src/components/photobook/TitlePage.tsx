import { Typography } from "@mui/material";

interface TitlePageProps {
  text: string;
  pageNum: number;
  pageStyle?: React.CSSProperties;
}

export function TitlePage({ text, pageNum, pageStyle }: TitlePageProps) {
  return (
    <div className="page" style={pageStyle}>
      <Typography variant="h1" fontFamily="Charm" align="center">
        {text}
      </Typography>
    </div>
  );
}

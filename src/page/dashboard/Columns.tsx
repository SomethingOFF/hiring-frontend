import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { Seeker } from "@/types";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Seeker>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue() as string,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: (info) => {
      const resume = info.getValue() as string;
      return (
        <div
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          <Link to={resume}>{resume}</Link>
        </div>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => info.getValue() as string,
    footer: (props) => props.column.id,
  },
  {
    id: "Actions",
    header: "Actions",
    cell: () => (
      <CellAction
      // data={row.original}
      />
    ),
    footer: (props) => props.column.id,
  },
];

import { SERVER_URL } from "@/lib/utils";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { TableCell } from "./ui/table";
import { useToast } from "./ui/use-toast";

export const TableActionItem = ({
  data,
  fetchData,
  deleteUrl,
  pathname,
  edit = false,
  view = false,
  viewPath,
}) => {
  const { user } = useSelector((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);

  let token = localStorage.getItem("LOCAL_STORAGE_TOKEN_KEY")

  const navigate = useNavigate();
  const { toast } = useToast();

  const deleteTableItem = async (id) => {
    try {
      setIsDeleting(true);
      const res = await axios.delete(`${SERVER_URL}${deleteUrl}${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      console.log(res);
      fetchData();
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Deleting",
        description: error.message || "Failed to delete item",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNavigate = (pathname) => {
    navigate({
      pathname: pathname,
      search: createSearchParams(data).toString(),
    });
  };

  return (
    <TableCell className="flex justify-end gap-2.5">
      {view && (
        <Button
          className="rounded-3xl h-auto"
          onClick={viewPath ? () => handleNavigate(viewPath) : null}
          id={data.id}
        >
          view
        </Button>
      )}
      {edit && (
        <Button
          className="rounded-3xl h-auto"
          onClick={pathname ? () => handleNavigate(pathname) : null}
          id={data.id}
        >
          <Edit className="w-3.5 h-3.5" />
        </Button>
      )}
      <Button
        id={data.id}
        isLoading={isDeleting}
        variant="outline"
        className="rounded-3xl h-auto relative"
        onClick={() => deleteTableItem(data.id)}
      >
        <Trash className="w-3.5 h-3.5" />
      </Button>
    </TableCell>
  );
};

TableActionItem.propTypes = {
  data: PropTypes.object,
  fetchData: PropTypes.func,
  deleteUrl: PropTypes.string,
  pathname: PropTypes.string,
  edit: PropTypes.bool,
  view: PropTypes.bool,
};

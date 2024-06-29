import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Heading = ({ children, className, ...props }) => {
  return (
    <h1 className={cn("text-2xl font-semibold", className)} {...props}>
      {children}
    </h1>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Heading;

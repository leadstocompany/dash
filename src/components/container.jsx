import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Container = ({ children, className, ...props }) => {
  return (
    <div className={cn("p-5 flex flex-col gap-5", className)} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;

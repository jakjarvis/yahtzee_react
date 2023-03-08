import "./button.styles.css";

const Button = ({ children, buttonClass, ...otherProps }) => {
  return (
    <button className={`btn ${buttonClass}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;

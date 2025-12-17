// Card UI component

function Card({
  children,
  header = null,
  footer = null,
  className = '',
  hoverable = false,
  ...props
}) {
  return (
    <div
      className={`card ${hoverable ? 'card--hoverable' : ''} ${className}`}
      {...props}
    >
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

export default Card;

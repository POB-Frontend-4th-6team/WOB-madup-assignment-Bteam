interface IButtonProps {
  type?: 'button' | 'submit'
  margin?: string
  text?: string
  width?: string
  height?: string
  fontSize?: string
  border?: string
  borderRadius?: string
  color?: string
  backgroundColor?: string
  onClick?: () => void
}

const Button = ({
  type,
  margin,
  text,
  width,
  height,
  fontSize,
  border,
  borderRadius,
  color,
  backgroundColor,
  onClick,
}: IButtonProps) => {
  const buttonStyles = {
    text,
    margin,
    width,
    height,
    fontSize,
    border,
    color,
    borderRadius,
    backgroundColor,
  }

  return (
    <button type={type === 'button' ? 'button' : 'submit'} style={buttonStyles} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button

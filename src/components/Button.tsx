interface IButtonProps {
  type?: 'button' | 'submit'
  text?: string
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  color?: string
  backgroundColor?: string
  onClick?: () => void
}

const Button = ({ type, text, width, height, border, borderRadius, color, backgroundColor, onClick }: IButtonProps) => {
  const buttonStyles = {
    text,
    width,
    height,
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

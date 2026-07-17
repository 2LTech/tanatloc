import NextImage from 'next/image'

const Image = (props) => (
  <NextImage
    {...props}
    style={{
      width: 'auto',
      height: 'auto'
    }}
  />
)

export default Image

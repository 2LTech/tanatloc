import NextImage from 'next/image'

type Props = (typeof NextImage)['arguments']

const Image = (props: Props) => (
  <NextImage
    {...props}
    style={{
      width: 'auto',
      height: 'auto'
    }}
  />
)

export default Image

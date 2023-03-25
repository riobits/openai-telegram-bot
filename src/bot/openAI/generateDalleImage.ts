import openai from './openai'

const generateDalleImage = async (text: string) => {
  const response = await openai.createImage({
    prompt: text,
    n: 1,
    size: '1024x1024',
  })
  return response.data.data[0].url
}

export default generateDalleImage

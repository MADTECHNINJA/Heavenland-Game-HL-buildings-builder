import { HEIGHT_LIMIT } from '../store/buildingSlice'

export default function isDisabled (group, blocks) {
  if (blocks.length === HEIGHT_LIMIT) return true

  switch (group) {
    case 'bases':
      return blocks.length
    case 'floors':
    case 'roofs':
      return !blocks.length || blocks[blocks.length - 1].group === 'roofs'
    default:
      return true
  }
}

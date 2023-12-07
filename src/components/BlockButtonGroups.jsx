import parts from '../data/building-parts.json'
import BlockButton from './BlockButton'
import BlockButtonAlert from './BlockButtonAlert'

const tabs = Object.keys(parts)

export default function BlockButtonGroups () {
  return (
    <div className='tab-content'>
      {
        tabs.map((tab, index) => (
          <div id={tab} className={`tab-pane fade${!index ? ' show active' : ''}`} key={tab}>
            <BlockButtonAlert type={tab} />
            {
              parts[tab].map((part, index) => (
                <span className='w-50 d-inline-block p-1 mb-1' key={part.building_game_id + index}>
                  <BlockButton block={part} />
                </span>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

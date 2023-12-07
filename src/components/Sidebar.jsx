import Buttons from './Buttons'
import BlockButtonGroups from './BlockButtonGroups'

import style from '../scss/modules/Sidebar.module.scss'

import logo from '../assets/logo.png'

import parts from '../data/building-parts.json'

const tabs = Object.keys(parts)

export default function Sidebar () {
  return (
    <>
      <aside
        className={style.sidebar}
      >
        <img className='px-5 py-3' src={logo} alt='HeavenLand' />
        <div className='flex-grow-1 overflow-auto px-3'>
          <BlockButtonGroups />
        </div>
        <Buttons />
      </aside>
      <ul className={`${style.tabs} nav nav-tabs`}>
        {
          tabs.map((tab, index) => (
            <li className='nav-item' key={tab}>
              <button
                data-bs-toggle='tab'
                data-bs-target={`#${tab}`}
                className={`nav-link${index ? '' : ' active'}`}
              >
                {tab}
              </button>
            </li>
          ))
        }
      </ul>
    </>
  )
}
